import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from '@mui/material';
import { initUser } from '@/store/main/slicer';
import { getData, mainFailure, mainLoading } from '@/store/main/selectors';


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const { authed, userName } = useSelector(getData, shallowEqual);
  const loading = useSelector(mainLoading, shallowEqual);
  const error = useSelector(mainFailure, shallowEqual);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setUser('');
  }

  const handleChangeUser = (e:ChangeEvent) => {
    setUser(e.target.value);
  }

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    if(!!user) dispatch(initUser(user));
    if(!user) dispatch(initUser('USERNAME'));
    handleClose();
  }

  return (
    <div className="homePage container">
      {!!loading &&
        <CircularProgress color="primary"
          sx={{ position: 'absolute', top: '48%', left: '50%', color: '#82B284'}}
        />
      }

      {!authed ?
        <div className="auth">
          {error && <p className="auth__err">Ошибка!</p>}
          <button className="commonBtn auth__btn" onClick={handleOpen}>Авторизоваться</button>
        </div>
        : <p className="userAuthed">Пользователь <span className="userAuthed__name">{userName}</span> авторизован</p>
      }

      <Dialog open={open} onClose={handleClose} className="dialog">
        <DialogContent className="dialog__content">
          <form id="dialogAuthForm" className="dialog__form" onSubmit={handleSubmit}>
            <input className="commonField dialog__field" type="text" name="name" placeholder="Введите имя" value={user} onChange={handleChangeUser} />
          </form>
        </DialogContent>
        <DialogActions className="dialog__actions">
          <Button className="dialog__btn" variant="text" onClick={handleClose}>ОТМЕНА</Button>
          <Button className="dialog__btn" variant="text" type="submit" form="dialogAuthForm">ОК</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
