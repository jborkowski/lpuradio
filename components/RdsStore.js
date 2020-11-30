import React, {useEffect} from 'react';
import {useStateValue} from "./GlobalState";

export function RdsStore() {

  const [{rds}, dispatch] = useStateValue();

  useEffect(() => {
    tick();
    setInterval(() => tick(), 10000);
  }, []);


  async function tick() {
    await fetch('https://lpuradio.pl/rds/rds.json')
      .then((r) => r.json())
      .then(
        (res) => {
          return {
            title: res.teraz.tytul,
            artist: res.teraz.wykonawca,
            // todo: https is necessary
            // cover = {uri: res.teraz.okladka};
          };
        },
        (error) => {
          console.log('error updating rds: ' + error);
          dispatch({
            type: 'updateRds',
            updated: {
              title: '',
              artist: '',
            }
          });
        },
      )
      .then((s) => {
        dispatch({
          type: 'updateRds',
          updated: s
        })
      })
  }

  return null;
}
