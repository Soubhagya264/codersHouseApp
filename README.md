# codersHubApp
codersHubApp is basically a drop-in Audio chat application which will be used to set up a podcast on 
any trending tech topics. Users or Clients can be participated from different networks. There will some
speakers and listners. If you are a speakers you have to create a room , inside the room there will multiple 
listners can join from different peers.

-- User have to folllow the authentication steps before entering into the room . 
-- There is a OTP based login system 

-- Here we are using ``hasing`` technique for ``load balancing``.  we create the hash form of otp in server and sent it to clinet side . Here in client side we store the Hash OTP and again send the user typed OTP + Hash OTP for verifying.

-- For the real time communication we use WebRTC API . WebRTC is a technology that enable Web applications and sites to capture and optionally stream audio and/or vedio media, as well as exchange the data between browser

--- Connections between two peers are represented by the ``RTCPeerConnection`` interface. Once a connection has been established and opened using RTCPeerConnection,media streams and/or data channels can be added to the comnnection.
--- Media streams can consist of any number of tracks of media information; tracks, which are represented by objects based on the MediaStreamTrack interface

### Connection setup and management

`RTCPeerConnection`

`RTCDataChannel`

`RTCDataChannelEvent`
  -- Represents events that occur while attaching a RTCDataChannel to a RTCPeerConnection. The only event sent with this interface is datachannel.
  
`RTCSessionDescription`
  -- Represents the parameters of a session.  Each RTCSessionDescription consists of a description type indicating which part of the offer/answer negotiation process it describes and of the SDP descriptor of the session.

`RTCIceCandidate`
  -- Represents a candidate Interactive Connectivity Establishment (ICE) server for establishing an RTCPeerConnection.
  
## Tech Stack

`React` `Node` `Express` `MongoDB` `WebRTC` `SocketIO` 

  
  
  

















