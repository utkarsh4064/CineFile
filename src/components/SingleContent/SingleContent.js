import React, { useEffect, useState } from 'react'
import { img_300, unavailable } from '../../config/config'
import './SingleContent.css'
import Badge from '@mui/material/Badge';
import ContentModal from '../ContentModal/ContentModal';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal/MyVerticallyCenteredModal';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const SingleContent = ({
    key,
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
    overview,
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className='media'>
        <Badge badgeContent={vote_average.toFixed(2)} color={vote_average>6?'primary':'secondary'}/>
     <img className="poster" src={poster ? `${img_300}/${poster}`:unavailable} alt={title} />
    <b className="title">{title}</b>
    <span className='subTitle' >{media_type==="tv"?"TV Series":"Movie"}
    <span className='subTitle' >{date}</span>
    </span>
    <Button style={{
      display: "flex",
    alignItems:"center",
    justifyContent:"center",
    bottom:"0%"
    }}
    
    variant="secondary" onClick={() => setModalShow(true)}>
        View More
      </Button>
      <MyVerticallyCenteredModal
        poster={poster}
        title={title}
        vote_average={vote_average}
        date={date}
        show={modalShow}
        onHide={() => setModalShow(false)}
        overview={overview}
        media_type={media_type}
        id={id}
      />
    </div>
  )
}

export default SingleContent
