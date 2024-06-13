import React, { useState } from "react";
import {Link} from 'react-router-dom'
import {
  Box,
  List,
  ListItem,
  Collapse,
  Typography,
  InputLabel,
  Input,
  CircularProgress,
} from "@mui/material";

import type { FC } from "react";

import useBrewery from "@api/useBrewery";

import {GetBreweriesResponse} from '@data/brewery'

import "./style";

const Brewery: FC = (): JSX.Element => {
  const { loading, data } = useBrewery();
  const [openIndex, setOpenIndex] = useState<number>()
  const [filter, setFilter] = useState<string>()

  const openHandle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null)
    } else {
      setOpenIndex(index)
    }
  }

  const filteredData = loading ? [] : !filter ? data : data.filter((item) => item.name.includes(filter))

  return (
    <>
      {loading && (
        <Box
          id="brewery"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!loading && (
        <Box id="brewery" display="flex" flexDirection='column' justifyContent="start">
          <InputLabel>Search</InputLabel>
          <Input value={filter} onChange={(event) => setFilter(event.target.value)}/>
          <List id='breweries'>
          {filteredData.map((brewery: GetBreweriesResponse, index) => <>
            <ListItem key={index} className='brewery' onClick={() => openHandle(index)}>
              <Typography className='info' variant='h6'>{brewery.name}</Typography>
              <Typography className='info' variant='body1'>{brewery.city}, {brewery.state}, {brewery.country}</Typography>
              <Typography className='info' variant='body1'>{'(' + brewery.brewery_type + ')'}</Typography>
              <Link to={brewery.website_url} target='_blank' className='info'>{brewery.website_url}</Link>
            </ListItem>
            <Collapse in={openIndex === index} timeout='auto' unmountOnExit>
              <Typography className='info' variant='body1'>{brewery.phone}</Typography>
              <Typography className='info' variant='body1'>{brewery.address_1}</Typography>
            </Collapse>
          </>)}
          </List>
        </Box>
      )}
    </>
  )
};

export default Brewery;
