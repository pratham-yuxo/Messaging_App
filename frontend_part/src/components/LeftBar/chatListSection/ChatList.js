import React, { useEffect, useState, useContext } from 'react'
import { getUsers } from '../../../allApis/forAdding'
import ChatListItem from './ChatListItem'
import { Box, Divider, styled } from '@mui/material'
import accountContext from "../../../context/accountContext"

const Divider2 = styled(Divider)`
margin:0 0 0 70px;
`

const ChatList = (props) => {
    const [users, setusers] = useState([])
    const {  Details, socket, setactiveUsers } = useContext(accountContext)
    useEffect(() => {
        const fetchData = async () => {
            let response = await getUsers();
            const filterData = response.filter(user => user.name.toLowerCase().includes(props.searchChatlist.toLowerCase()));
            setusers(filterData);
            // console.log(response)
        }
        fetchData();
    }, [props.searchChatlist])

    // socket io
    useEffect(() => {
        // emit used for sending information
        // .on is used for getting
        socket.current.emit('addUsers', Details);// because we have used use ref
        socket.current.on('getUsers', users => {
            setactiveUsers(users);
        })//this callback will be run after getting the user from socket server

    }, [Details])


    return (
        <Box>
            {
                users.map(user => {

                    return user.email !== Details.email && <div key={user.email}>
                        <ChatListItem user={user} />
                        <Divider2 />
                    </div>

                })
            }
        </Box>
    )
}

export default ChatList