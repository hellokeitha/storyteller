import React from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

function Cards({ data }) {
  const navigate = useNavigate()

  const navigateToDetailHandler = (id) => {
    navigate(`/details/${id}`)
  }

  return (
    <>
      <StCardsList>
        {data.map((item, index) => (
          <StCards key={index} onClick={() => navigateToDetailHandler(item.id)}>
            {/* <div>{item.img}</div> */}
            <div>{item.category}</div>
            <div>{item.title}</div>
            <div>{item.body}</div>
            <div>{item.director}</div>
            <div>{item.createdBy}</div>
          </StCards>
        ))}
      </StCardsList>
    </>
  )
}

export default Cards

const StCards = styled.div`
  color: #0d3441;
  border: 1px solid black;
  min-width: 20vh;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  padding: 10px;
`
const StCardsList = styled.div`
  color: #0d3441;
  min-width: 20vh;
  min-height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
