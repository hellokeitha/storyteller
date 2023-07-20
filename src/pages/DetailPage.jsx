import React, { useState, useEffect } from 'react'
import * as St from '../style/StDetailStyled'
import { useParams } from 'react-router-dom'
import DefaultImg from '../assets/DefaultImg.png'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase'
import { DetailButton, UpButton } from '../components/Button'

const DetailPage = () => {
  const [liked, setLiked] = useState(false)
  const [infos, setInfos] = useState([])
  const { title } = useParams()

  const handleLike = () => {
    setLiked(!liked)
  }

  useEffect(() => {
    const fetchData = async () => {
      // infos 정보 가져오기
      const q = query(collection(db, 'infos'))
      const querySnapshot = await getDocs(q)
      const initialInfos = []
      querySnapshot.forEach((doc) => {
        initialInfos.push({ id: doc.id, ...doc.data() })
      })
      setInfos(initialInfos)
    }

    fetchData()
  }, [])

  if (!infos) {
    return <div>Loading...</div>
  }
  const filteredInfo = infos.find((info) => ':' + info.id === title)
  return (
    <div id='1'>
      <St.Grid>
        {/* 특정 id에 해당하는 정보만 렌더링 */}
        {filteredInfo && (
          <div>
            <St.DramaImgBox>
              <St.DramaImg src={filteredInfo.img ? filteredInfo.img : DefaultImg} alt='이미지 업로드' />
            </St.DramaImgBox>
            <h4> {filteredInfo.createdBy}</h4>
            <St.Context>
              <h2>{filteredInfo.title}</h2>
              <div>{filteredInfo.body}</div>
            </St.Context>
            <St.Context>
              <h2>제작정보</h2>
              <div>{filteredInfo.director}</div>
            </St.Context>
            <St.YoutubeContext>youtube-privew</St.YoutubeContext>
            <DetailButton
              handleLike={handleLike}
              liked={liked}
              id={filteredInfo.title}
              img={filteredInfo.img}
              category={filteredInfo.category}
              title={filteredInfo.title}
              createdBy={filteredInfo.createdBy}
              body={filteredInfo.body}
              director={filteredInfo.director}
            />
          </div>
        )}
      </St.Grid>
      <UpButton />
    </div>
  )
}

export default DetailPage