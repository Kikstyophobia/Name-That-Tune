import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Fade } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { gameScore } from './helper.js/helperfunctions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GameModal({ isWinner, gameReset, user, turnsLeft, answer }) {
  const [open, setOpen] = React.useState(true);


  return (
    <div>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open} timeout={800}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Game Over
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className='modal-box'>
                <p className='game-modal-text'>
                  {user.name}
                  <span>{isWinner ? "You win!" : "You lost!"}</span>
                  <span>The Correct Answer was {answer}</span>
                  <span>You scored {gameScore(isWinner, turnsLeft)} Points</span>
                </p>
                <IconButton onClick={gameReset}><ReplayIcon /></IconButton>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}