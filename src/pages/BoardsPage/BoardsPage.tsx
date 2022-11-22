import React from 'react';
import { useSelector } from 'react-redux';
import { IStore, useCreateBoardMutation } from 'store';

export function BoardsPage() {
  const [createBoard, { data, isLoading, isSuccess, isError }] = useCreateBoardMutation();
  const { token } = useSelector((store: IStore) => store);
  return (
    <>
      <h2>Boards</h2>
      <button
        onClick={() =>
          createBoard({
            token,
            body: {
              title: 'New board title',
              description: 'Очень странная доска',
              owner: '637ac517ffbaf569ff291345',
              users: ['637ac517ffbaf569ff291345', '6374f020ed701eaa456b121d'],
            },
          })
        }
        disabled={isLoading}
      >
        Create board
      </button>
      <br />
      <p>{`isLoading: ${isLoading}`}</p>
      <p>{`isSuccess: ${isSuccess}`}</p>
      <p>{`isError:   ${isError}`}</p>
      <p>{`data: ${JSON.stringify(data)}`}</p>
    </>
  );
}
