import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchShows from './SearchShows';
import ShowListCard from './ShowListCard';
import {Card, Grid} from '@mui/material';

import '../App.css';

const ShowList = () => {
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState(undefined);
  const [showsData, setShowsData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  let cardsData = null;

  useEffect(() => {
    console.log('on load useeffect');
    async function fetchData() {
      try {
        const {data} = await axios.get('http://api.tvmaze.com/shows');
        setShowsData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log('search useEffect fired');
    async function fetchData() {
      try {
        console.log(`in fetch searchTerm: ${searchTerm}`);
        const {data} = await axios.get(
          'http://api.tvmaze.com/search/shows?q=' + searchTerm
        );
        setSearchData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      console.log('searchTerm is set');
      fetchData();
    }
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  if (searchTerm) {
    cardsData =
      searchData &&
      searchData.map((shows) => {
        let {show} = shows;
        return <ShowListCard show={show} key={show.id} />;
      });
  } else {
    cardsData =
      showsData &&
      showsData.map((show) => {
        return <ShowListCard show={show} key={show.id} />;
      });
  }

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div>
        <SearchShows searchValue={searchValue} />
        <br />
        <br />
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            flexDirection: 'row'
          }}
        >
          {cardsData}
        </Grid>
      </div>
    );
  }
};

export default ShowList;
