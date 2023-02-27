import React from 'react';
import { Typography, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Languages } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeLanguage, updateLanguage } from '../../store/dataSlice';
import styles from './LanguageSlider.module.scss';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

function LanguageSlider() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authorization);
  const languageState: string = useAppSelector((state) => state.data.language);
  const changeLanguageState = async (str: Languages) => {
    dispatch(changeLanguage(str));
    if (isAuth) {
      await updateLanguage(str);
    }
  };
  return (
    <div className={styles.container}>
      <Typography>{Languages.En}</Typography>
      <AntSwitch
        checked={languageState === Languages.Ru}
        onChange={() => {
          if (languageState === Languages.En) {
            changeLanguageState(Languages.Ru);
          } else changeLanguageState(Languages.En);
        }}
        inputProps={{ 'aria-label': 'ant design' }}
      />
      <Typography>{Languages.Ru}</Typography>
    </div>
  );
}

export default LanguageSlider;
