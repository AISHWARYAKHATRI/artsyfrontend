import React, { useState, useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';
import { getArtsyArtworks } from '../../api';
import {  CardMedia, Typography } from '@material-ui/core/';

import Post from './Post/Post'
import useStyles from './styles'



const Posts = ({ setCurrentId }) => {
  // useSelector is a hook to access the redux store
  const { posts, isLoading } = useSelector((state) => state.posts)
  const classes = useStyles();
  const [artposts, setArtPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState()

  useEffect(() => {
    const get = async () => {
      const artworks = await getArtsyArtworks(page);
      setArtPosts((prev) => [...prev, ...artworks]);
      setLoading(false);
    }
    setTimeout(() => get(), 1000);
    
  }, [page]);

  const handleInfiniteScroll = async () => {
    try {
      if(window.innerHeight+document.documentElement.scrollTop+1 >= document.documentElement.scrollHeight) {
        setPage((prev) => prev + 1);
        setLoading(true);
      }
    } catch (e) {

    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  })


  if(!posts?.length && !isLoading) return 'No Posts';
  return (
    // if there no no posts/there are posts then do the following
    <>
   { isLoading ? <CircularProgress className={classes.loader}/> : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {
      posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      )) 
      }
      </Grid>
   )}
    <Typography className={classes.inspire}>Inspire Your Artistry Here&#10024;</Typography>
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {
        artposts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          {/* {.map((photos) => */}
          <CardMedia className={classes.media} key={post.preview_photos[0].urls.raw} image={post.preview_photos[0].urls.small} width="300"/>
          {/* )} */}
      </Grid>
      )) 
    }
    { loading && <CircularProgress className={classes.loader} />  }
    </Grid>
   
    </>
  )
}

export default Posts