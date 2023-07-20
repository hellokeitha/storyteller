import React, { useState, useRef, useEffect } from 'react'
import * as St from '../style/StWriteStyled'
import DefaultImg from '../assets/DefaultImg.png'
import EditCategory from '../components/EditCategory'
import { collection, getDocs, query, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage, db } from '../firebase'
import { EditButton, UpButton } from '../components/Button'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const EditPage = () => {
  const { state } = useLocation()
  const { title, createdBy, body, director, img, category } = state
  const [imgFile, setImgFile] = useState(img)
  const [infos, setInfos] = useState([])
  const { id } = useParams()

  // 상위 컴포넌트에서 id 가져올 수 있으면 삭제
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

  const [item, setItem] = useState({
    title,
    createdBy,
    body,
    director,
    category
  })
  const imgRef = useRef()
  const onChange = (event) => {
    const { value, name } = event.target
    setItem({
      ...item,
      [name]: value,
    })
  }

  const navigate = useNavigate()

  // 이미지 업로드 input의 onChange
  const saveImgFile = async () => {
    const file = imgRef.current.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImgFile(reader.result)
      }
    }
  }

  const deleteImg = () => {
    setImgFile('')
  }

  const handleSaveOption = (option) => {
    setItem((prev) => {
      if (prev.category === option) {
        return prev; 
      } else {
        return {
          ...prev,
          category: option, 
        };
      }
    });
  };

  const handleEdit = async (event) => {
    event.preventDefault()
    if (!imgFile || !title || !createdBy || !body || !director) {
      alert('빈칸을 채워주세요!')
      return
    }
    let downloadURL = imgFile
    if (imgFile !== img) {
      const imageRef = ref(storage, `${title}/${imgRef.current.files[0].name}`)
      await uploadBytes(imageRef, imgRef.current.files[0])
      downloadURL = await getDownloadURL(imageRef)
    }
    
    const newInfo = {
      id: title,
      title,
      createdBy,
      body,
      img: downloadURL,
      director,
      category: item.category,
    }
    setInfos((prev) => {
      return [...prev, newInfo]
    })

    const infoRef = doc(db, 'infos', title)

    await updateDoc(infoRef, newInfo)

    alert('저장되었습니다!')

    navigate('/admin')
  }

  return (
    <div id='1'>
      <St.Grid>
        <div>
          <St.ImgUpload>
            <div>
              <St.UploadImgFile src={imgFile ? imgFile : DefaultImg} alt='이미지 업로드' />
              <br />
              <St.UdLabels>
                <St.UploadLabel>
                  <label htmlFor='inputprofileImg'>사진 업로드</label>
                  <form>
                    <St.InputprofileImg
                      id='inputprofileImg'
                      type='file'
                      accept='image/png, image/jpeg, image/jpg'
                      onChange={saveImgFile}
                      ref={imgRef}
                    />
                  </form>
                </St.UploadLabel>
                <St.DeleteLabel>
                  <label htmlFor='deleteprofileImg'>삭제하기</label>
                  <St.DeleteprofileImg id='deleteprofileImg' type='button' onClick={deleteImg} />
                </St.DeleteLabel>
              </St.UdLabels>
              <br />
              <br />
            </div>
          </St.ImgUpload>
          <St.Body>
            <div>Title</div>
            <St.InputTitle type='text' name='title' placeholder='제목' value={item.title} onChange={onChange} />
            <div>editor</div>
            <St.InputCreatedBy
              type='text'
              placeholder='작성자'
              name='createdBy'
              value={item.createdBy}
              onChange={onChange}
            />
            <div>category</div>
            {/* 카테고리 선택 드롭다운 */}
            <EditCategory handleSaveOption={handleSaveOption} category={category} />
            <div>body</div>
            <St.BodyTextarea
              name='body'
              cols='30'
              rows='10'
              placeholder='작품 소개를 입력해주세요'
              value={item.body}
              onChange={onChange}
            />
          </St.Body>

          <St.Director>
            <div>author-context</div>
            <St.DirectorTextarea
              name='director'
              cols='30'
              rows='10'
              placeholder='제작 정보를 입력해주세요'
              value={item.director}
              onChange={onChange}
            />
          </St.Director>
          <St.YoutubeContext>youtube-privew</St.YoutubeContext>
          {/* api 불러온 후 수정 */}
          <EditButton handleEdit={handleEdit} />
        </div>
      </St.Grid>
      <UpButton />
    </div>
  )
}

export default EditPage