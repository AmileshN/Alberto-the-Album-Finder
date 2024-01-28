import './Album.css';
import { useEffect,useState } from 'react';
import { Center, ChakraProvider, LinkBox, LinkOverlay,Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, SimpleGrid,Image } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; 
const CLIENT_SECRET  = process.env.REACT_APP_CLIENT_SECRET; 


function Album() {
  const [userInput,setUserInput] = useState('')
  const [token,setToken] = useState('')
  const [albums,setAlbums] = useState([])

  //change the value in the search bar
  const handleChange = (event) => {
    event.preventDefault()
    setUserInput(event.target.value)
  }

  //get the access token to be used for requests
  useEffect(() => {
    var authParams = {
      method:"POST",
      headers: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
    }
    fetch("https://accounts.spotify.com/api/token",authParams)
    .then(resp => resp.json())
    .then(data => setToken(data.access_token))
    .catch( (e) => {console.log(e)})


  },[])

  //search for albums by artist
  async function search(){
    console.log("Searching for "+userInput)
    var artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + token
      }

    }
    // get the artist ID
    var artistID = await fetch('https://api.spotify.com/v1/search?q='+userInput+"&type=artist",artistParams)
    .then(resp => resp.json())
    .then(data => {return data.artists.items[0].id})
    .catch((e) => {console.log(e)})
    
    // get the albums of that artist 
    var albums_output = await fetch('https://api.spotify.com/v1/artists/'+artistID+'/albums'+'?include_groups=album&market=US&limit=50',artistParams)
    .then(resp => resp.json())
    .then(data => {console.log(data);
        setAlbums(data.items)
      
      })

  }
  return (
    <ChakraProvider>
      <Link to="./user"><Button>Get Your Saved Albums</Button></Link>

      
    <div className="Album"> 
        <h1>Alberto, the Album Finder</h1>
        <input className = "searchBar" type="search" placeholder="Enter Artist Name Here and Hit Enter" defaultValue={userInput} 
        onKeyDown={(event) => {
          if (event.key==="Enter" && userInput != ''){
            search()
          }
        }}
        onChange={handleChange}  />
        <br />
        <SimpleGrid spacing={10} columns={[2, null, 3]} >
          {albums.map( (album,i) => {
            return (
              <Card>
                <CardHeader>
                  <LinkBox>
                  <LinkOverlay target="_blank" href={album.external_urls.spotify}>
                  <Center>
                <Image
                  objectFit='cover'
                  boxSize='280px'
                  src={album.images[0].url}
                />  
                </Center> 
                </LinkOverlay>
                </LinkBox>       
                </CardHeader>
                <CardBody>
                <Center>{album.name}</Center>              
                </CardBody>
                </Card>
               

            )

          })}
          </SimpleGrid>
        
        
    </div>
    </ChakraProvider>
  );
}

export default Album;
