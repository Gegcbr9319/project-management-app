import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ArrowBackIosNew, Add } from '@mui/icons-material';
import { Column, Loader, ModalColumns } from 'components';
import { useNavigate } from 'react-router';
import styles from './BoardPage.module.scss';
import { useGetBoardByIdQuery, useGetColumnsInBoardQuery } from 'store';

export const BoardPage = () => {
  const [callingForm, setCallingForm] = useState(false);
  const boardId = location.pathname.split('/').reverse()[0];
  const navigate = useNavigate();
  const { data, isLoading } = useGetBoardByIdQuery({ boardId });
  const columns = useGetColumnsInBoardQuery({ boardId });

  const columnsAdd = () => {
    setCallingForm(true);
  };

  const backHandler = () => {
    navigate('/' + location.pathname.split('/')[1]);
  };

  return (
    <>
      {(isLoading || columns.isLoading) && <Loader />}
      <div className={styles.board}>
        {data && (
          <>
            <h2>{data.title}</h2>
            <h3>{data.description}</h3>
          </>
        )}
        {columns?.data?.length !== 0 && <h3> Columns </h3>}
        <div className={styles.columns}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNew />}
            onClick={backHandler}
            size="small"
            color="warning"
            className={styles.button}
          >
            Go back
          </Button>
          <div className={styles.column}>
            {columns?.data
              ?.map((index) => index)
              .sort((a, b) => a.order - b.order)
              .map((index) => {
                return (
                  <Column
                    key={index._id}
                    columnId={index._id}
                    title={index.title}
                    boardId={boardId}
                  />
                );
              })}
          </div>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={columnsAdd}
            size="small"
            color="info"
            className={styles.button}
            disabled={columns.isLoading}
          >
            Add Column
          </Button>
        </div>
      </div>
      {callingForm && (
        <ModalColumns type="create column" setCallingForm={setCallingForm} boardId={boardId} />
      )}
    </>
  );
};
