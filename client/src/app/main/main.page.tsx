import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "./app-bar.component";
import InputBar from "./input-bar.component";
import Todo from "./todo.component";
// ============== Types ==============
import { CreateTodoDto } from "types/create-todo-dto.type";

// ============== Components ==============
import Loading from "components/loading.component";
import ErrorAlert from "components/error-alert.component";

// ============== Graphql ==============
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TODO, DELETE_TODO, GET_ALL_TODOS, UPDATE_TODO } from "app/graphql/todos";
import { TodoType } from "types/Todo";

function MainPage() {
  const location = useLocation();
  const [todoList, setTodoList] = useState<Array<TodoType>>([]);

  const { data: data, error, loading, refetch: refetchTodos } = useQuery(GET_ALL_TODOS);
  const [deleteTodo, { data: todoDelData }] = useMutation(DELETE_TODO);
  const [createTodo, { data: todoCreateData }] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  useEffect(() => {
    if (todoDelData?.removeTodo) {
      refetchTodos();
    }
  }, [todoDelData])

  useEffect(() => {
    if (data?.todos) {
      const arrayForSort = [...data.todos]
      setTodoList(arrayForSort.sort( (a: any, b: any) => a.id - b.id));
    }   
  }, [data])

  useEffect(() => {
    if (todoCreateData?.createTodo) {
      refetchTodos();
    }
  }, [todoCreateData])

  const addNewTodo = async (newTodo : CreateTodoDto) => {
    createTodo({variables: { "input": { ...newTodo } } });
  }

  const removeTodo = (id : number) => {
    deleteTodo({ variables: { id } });
  }

  const updateStatus = (id : number, isDone : Boolean) => {
    updateTodo({variables: { "input": { id, isDone} } });
  }
  
  return (
    <Grid container>
      <Grid container item>
        <ResponsiveAppBar/>
      </Grid>
      <Grid container item>
        <Typography 
          variant="h2"
          sx={{
            marginLeft: 'auto', 
            marginRight: 'auto',
            marginTop: '50px'
          }}
        >
          Create TODO List
        </Typography>
        {
          location.state
          ?
            <Typography>{location.state}</Typography>
          :
            <></>
        }
      </Grid>
      <Grid container item>
        <InputBar addNewTodo={addNewTodo}/>
      </Grid>
      {
        loading 
        ?
         <Grid 
            sx={{
              height: '50vh', 
              alignItems: 'center', 
              display: 'flex', 
              width: '100%'
            }}
          >  
            <Loading/>
          </Grid>
        :
          <Grid container item sx={{marginTop: '100px'}}>
            {todoList.map((todo) => 
              <Todo
                key={todo.id}
                id={todo.id}
                text={todo.text} 
                isDone={todo.isDone} 
                deleteTodo={removeTodo}
                updateStatus={updateStatus}
              />
          )}
          </Grid>
      }
      <Grid
        container
        item
        sx={{ marginTop: '30px', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
      >
        {error && <ErrorAlert title="Error" text={error.message} />}
      </Grid>
    </Grid>
  );
}

export default MainPage;
