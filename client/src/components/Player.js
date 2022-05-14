import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Player({ accessToken, refreshToken }) {
  const [track, setTrack] = useState('')
  const [guesses, setGuesses] = useState(1)
  const [device, setDevice] = useState()
  const [player, setPlayer] = useState()
  const [trackList, setTrackList] = useState()

  useEffect(() => {
    if (accessToken) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: cb => { cb(accessToken); },
          volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id)
          setDevice(device_id)
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });


        player.connect();
        console.log("player, connected")

        retrievePlaylist()

        return () => {
          player.disconnect()
        }
      };
    }
  }, [accessToken]);

  // changeDevice if device state is updated
  useEffect(() => {
    if (device)
      changeDevice(device)
  }, [device])

  const retrievePlaylist = () => {
    axios('https://api.spotify.com/v1/playlists/2dEZn55szDawgoYOYQWHKQ/tracks', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': "application/json"
      }
    }
    ).then(data => {
      const returnedSongs = data.data.items.map(item => {
        return {
          id: item.track.id,
          title: item.track.name
        }
      })
      const playlist = returnedSongs.reduce((obj, item) => {
        const key = item["id"]
        return { ...obj, [key]: item }
      }, {})
      // set to state
      setTrackList(returnedSongs)
      currentTrack(returnedSongs)
    })
  }

  const currentTrack = (tracks) => {
    const index = Math.floor(Math.random() * (tracks.length - 1))
    console.log("index", index)
    setTrack(tracks[index])
  }

  const play = (device) => {
    console.log("this is the current track", track.id)
    console.log("this is the device", device)
    axios(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        "Content-Type": "application/json"
      },
      data: {
        "uris": [`spotify:track:${track.id}`]
      },
      "position_ms": 0,
    }).then(() => setTimeout(() => {
      pause()
    }, (guesses * 3000)))
  }

  const pause = (device) => {
    axios('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        "Content-Type": "application/json"
      },
    })
  }

  const skipTurn = () => {
    setGuesses = (prev => prev + 1)
  }

  const changeDevice = (device) => {
    axios(`https://api.spotify.com/v1/me/player?${device}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        "Content-Type": "application/json"
      },
      data: {
        "device_ids": [device]
      },
    })
  }

  return (
    <div>
      <button onClick={() => play(device)}> >>>>> </button>
      <button onClick={play}> skip </button>
    </div>
  )
}
