import './Album.css';
import axios from 'axios';
import { useEffect,useState} from 'react';
import { ChakraProvider,Button,Center,LinkBox,LinkOverlay} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, SimpleGrid,Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; 
const REDIRECT_URI = "http://localhost:3000/user"
// const REDIRECT_URI ="https://amileshn.github.io/Alberto-the-Album-Finder/#/user"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"
const SCOPES = ["user-top-read","user-read-private","user-library-read"]
const SCOPES_URL_PARAM = SCOPES.join("%20")
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/albums";

function User() {
  const [token,setToken] = useState('');
  const [albums,setAlbums] = useState([]);

  const login = () =>{
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=${RESPONSE_TYPE}&show_dialog=true`
  }
  
  const getReturnValues = (hash) => {
    const hashString = hash.substring(1);
    const params = hashString.split("&");
    const paramsSplit = params.reduce((accumulater, currentValue) => {
       
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    },{});
    console.log(paramsSplit)
    return paramsSplit;

  }
    useEffect (()=>{
        if(window.location.hash){
            const {access_token} = getReturnValues(window.location.hash);
            setToken(access_token);

        }
        else{
            console.log("No access token found");
        }
        
   
    },[])

    const getData = () => {
      var params = {
        headers:{
          Authorization: "Bearer " + token,
        }
      }

      axios.get(PLAYLISTS_ENDPOINT,params)
      .then((resp) => {
        console.log(resp.data.items)
        setAlbums(resp.data.items);

      })
      .catch((e) => {console.log(e)})

    }
  
  return (
    <ChakraProvider>
        <Button><Link to="../">Go Back</Link></Button>
        <Button onClick={login}>Log in</Button>
        {token != '' ?<Button onClick={getData}>Get Your Albums</Button> : " <- Log in first to access your saved albums" }
        <SimpleGrid spacing={10} columns={[2, null, 3]} >
          {albums.map( (album,i) => {
            {console.log(album.album.name)}
            return (
              <Card>
                <CardHeader>
                  <LinkBox>
                  <LinkOverlay target="_blank" href={album.album.external_urls.spotify}>
                  <Center>
                <Image
                  objectFit='cover'
                  boxSize='280px'
                  src={album.album.images[0].url}
                />  
                </Center> 
                </LinkOverlay>
                </LinkBox>       
                </CardHeader>
                <CardBody>
                <Center>{album.album.name}</Center>              
                </CardBody>
                </Card>
          
            )
          })}
          </SimpleGrid>
    </ChakraProvider>
    
    
  );
  }

export default User;
