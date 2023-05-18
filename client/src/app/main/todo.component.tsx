import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox, Grid, OutlinedInput } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useAlert } from 'react-alert-with-buttons';

interface IProps {
  id: number
  text: string
  isDone: boolean
  deleteTodo: (id: number) => void,
  updateStatus: (id: number, isDone: Boolean) => void
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const Todo = ({ id, text, isDone, deleteTodo, updateStatus }: IProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(isDone)
  const alert = useAlert()

  const deleteBtnHandle = () => {
    alert.open({
      message: "Are you sure what you want to delete TODO?",
      buttons: [
        {
          label: "Ok",
          onClick: () => {
            deleteTodo(id);
            alert.close();
          },
        },
      ],
    })
  }

  const checkboxHandle = () => {
    const isDone: Boolean = !isChecked;
    updateStatus(id, isDone);
    setIsChecked(!isChecked);
  }

  return (
    <Grid container sx={{ marginBottom: '10px' }}>
      <Checkbox
        {...label}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        sx={{
          marginLeft: 'auto'
        }}
        checked={isChecked}
        onClick={() => checkboxHandle()}
      />
      <OutlinedInput
        value={text}
        sx={{
          margin: '0 30px',
          width: '80%',
          color: 'black'
        }}
        readOnly
      />
      <DeleteIcon
        sx={{
          marginRight: 'auto',
          alignSelf: 'center',
          color: '#1976d2'
        }}
        onClick={() => deleteBtnHandle()}
      />
    </Grid>
  )
}

export default Todo;