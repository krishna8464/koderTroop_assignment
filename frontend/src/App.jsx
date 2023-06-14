import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";

function App() {
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [todos, setTodos] = useState([]);
  const [progess, setProgress] = useState([]);
  const [qa, setQa] = useState([]);
  const [done, setDone] = useState([]);
  const [searchTodo, setSearchTodo] = useState([]);
  const [description, setDescription] = useState("");

  const getTodos = () => {
    axios
      .get("https://calm-jade-beanie.cyclic.app/")
      .then((res) => {
        setTodos(res.data.todos);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getprogress = () => {
    axios
      .get("https://calm-jade-beanie.cyclic.app/progress")
      .then((res) => {
        setProgress(res.data.todos);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getQa = () => {
    axios
      .get("https://calm-jade-beanie.cyclic.app/qa")
      .then((res) => {
        setQa(res.data.todos);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDone = () => {
    axios
      .get("https://calm-jade-beanie.cyclic.app/done")
      .then((res) => {
        setDone(res.data.todos);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTodos();
    getprogress();
    getQa();
    getDone();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      completed: false,
    };
    axios
      .post("https://calm-jade-beanie.cyclic.app/", newTodo)
      .then((res) => {
        console.log(res);
        setTodos([...todos, res.data.result]);
      })
      .catch((err) => {
        console.log(err);
      });

    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://calm-jade-beanie.cyclic.app/${id}`)
      .then((res) => {
        console.log(res);
        setTodos(todos.filter((el) => el._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletedone = (id) => {
    axios
      .delete(`https://calm-jade-beanie.cyclic.app/done/${id}`)
      .then((res) => {
        console.log(res);
        setDone(done.filter((el) => el._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteprogress = (id) => {
    axios
      .delete(`https://calm-jade-beanie.cyclic.app/progress/${id}`)
      .then((res) => {
        console.log(res);
        setProgress(progess.filter((el) => el._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteqa = (id) => {
    axios
      .delete(`https://calm-jade-beanie.cyclic.app/qa/${id}`)
      .then((res) => {
        console.log(res);
        setQa(qa.filter((el) => el._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`https://calm-jade-beanie.cyclic.app/?query=${query}`)
      .then((res) => {
        console.log(res);
        if (query.trim() === "") {
          setSearchTodo(todos);
        } else {
          const filteredTodos = todos.filter((todo) =>
            todo.title.toLowerCase().includes(query.toLowerCase())
          );
          setSearchTodo(filteredTodos);
          console.log(searchTodo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query, todos]);

  const handleSelect = async (e, el) => {
    try {
      if (e.target.value === "progress") {
        axios
          .post("https://calm-jade-beanie.cyclic.app/progress", el)
          .then((res) => {
            console.log(res);
            setProgress([...progess, res.data.result]);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (e.target.value === "qa") {
        axios
          .post("https://calm-jade-beanie.cyclic.app/qa", el)
          .then((res) => {
            console.log(res);
            setQa([...qa, res.data.result]);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (e.target.value === "done") {
        axios
          .post("https://calm-jade-beanie.cyclic.app/done", el)
          .then((res) => {
            console.log(res);
            setDone([...done, res.data.result]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box >
      <Box >
      <Text  as={"h1"} style={{
        color:"red",
        fontSize:"60px",
        marginLeft:"40%",  
        fontWeight:"bolder"
      }} >Todo App</Text>
   
      <Box w={"30%"} m={"auto"}>
      <br />
      <br />
        <Input
          type="text"
          value={query}
          placeholder="search here"
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
      <br />
      <br />
      <Center w={"80%"} m={"auto"} className="App">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <Textarea
            name=""
            id=""
            cols="20"
            rows="4"
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <Button colorScheme="blue" marginLeft={"30%"}  type="submit">Add Todo</Button>
        </form>
      </Center>
      </Box>
      <br />
      <br />
      <Flex justifyContent={"space-between"} w={"95%"} m={"auto"} padding={"20px"}  >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            
          }}
        >
          <Heading textAlign={"center"}  as={"h3"} fontSize={"40px"} color={"blue.400"} >TODO</Heading>
          {searchTodo &&
            searchTodo.map((el, i) => {
              return (
                <Box key={el._id}  className="item">
                  {" "}
                  <Heading as={"h6"} fontSize={"25px"} color={"green"} fontWeight={"600"} >
                   Title : {el.title}
                  </Heading>
                  <Text> 
                    Description:{el.description}
                  </Text>
                  {" "}
                  <Button colorScheme="pink" margin={"5px"} onClick={() => handleDelete(el._id)}>Delete</Button>
                  <Select
                   m={"5px"}
                    placeholder="Select option"
                    onChange={(e) => {
                      handleSelect(e, el);
                    }}
                  >
                    <option value="progress">IN PROGRESS</option>
                    <option value="qa">Q&A</option>
                    <option value="done">DONE</option>
                  </Select>
                </Box>
              );
            })}
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginLeft: "15px",
          }}
        >
          <Heading textAlign={"center"}  as={"h3"} fontSize={"40px"} color={"blue.400"} >IN PROGRESS</Heading>

          {progess.map((el, i) => {
            return (
              <Box key={el._id} className="item">
                {" "}
                <Heading as={"h6"} fontSize={"25px"} color={"green"} fontWeight={"600"}>
                  Title : {el.title}
                </Heading>
                <Text> 
                    Description : {el.description}
                  </Text>
                <Button colorScheme="pink" onClick={() => handleDeleteprogress(el._id)}>
                  Delete
                </Button>
              </Box>
            );
          })}
        </Box>

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginLeft: "15px",
          }}
        >
          <Heading textAlign={"center"}  as={"h3"} fontSize={"40px"} color={"blue.400"} >Q&A</Heading>

          {qa.map((el, i) => {
            return (
              <Box key={el._id} className="item">
                {" "}
                <Heading aas={"h6"} fontSize={"25px"} color={"green"} fontWeight={"600"}>
                  Title : {el.title}
                </Heading>
                <Text> 
                    Description:{el.description}
                  </Text>
                <Button colorScheme="pink" onClick={() => handleDeleteqa(el._id)}>Delete</Button>
              </Box>
            );
          })}
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginLeft: "15px",
          }}
        >
          <Heading textAlign={"center"} as={"h3"} fontSize={"40px"} color={"blue.400"} >DONE</Heading>

          {done.map((el, i) => {
            return (
              <Box key={el._id} className="item">
                {" "}
                <Heading as={"h6"} fontSize={"25px"} color={"green"} fontWeight={"600"}>
                  Title : {el.title}
                </Heading>
                <Text> 
                    Description:{el.description}
                  </Text>
                <Button colorScheme="pink" onClick={() => handleDeletedone(el._id)}>Delete</Button>
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
