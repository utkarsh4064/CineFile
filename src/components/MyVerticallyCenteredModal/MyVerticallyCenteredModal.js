import { Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
// import { Modal } from 'react-bootstrap';
import axios from "axios";
import { img_300, unavailable } from '../../config/config'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Button } from '@mui/material';
const MyVerticallyCenteredModal = (props) => {
    const [video, setVideo] = useState();

    const fetchVideo = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${props.media_type}/${props.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
    
        setVideo(data.results[0]?.key);
      };
        console.log(props.id);
      useEffect(() => {
        fetchVideo();
        // eslint-disable-next-line
      }, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.media_type.toUpperCase() } OVERVIEW
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <img src={props.poster ? `${img_300}/${props.poster}`:unavailable} alt={props.title} />
        <h3>{props.title}</h3>
        <h4>ImDb : {props.vote_average}</h4>
        <h5>Date : {props.date}</h5>
        <br/>
        <br/>
        <h6>Overview</h6>
        <p>{props.overview}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='contained' startIcon={< YouTubeIcon/>} color='secondary' href={`http://www.youtube.com/watch?v=${video}`}>Watch The Trailer</Button>
      </Modal.Footer>
    </Modal>
  
  );
}

export default MyVerticallyCenteredModal
