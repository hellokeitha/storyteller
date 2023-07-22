import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import DetailPage from '../pages/DetailPage'
import AdminPage from '../pages/AdminPage'
import SearchPage from '../pages/SearchPage'
import AboutPage from '../pages/AboutPage'
import WritePage from '../pages/WritePage'
import EditPage from '../pages/EditPage'
import Layout from './Layout'
import PreviewPage from '../pages/PreviewPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/write' element={<WritePage />} />
          <Route path='/edit/:id' element={<EditPage />} />
          <Route path='/preview' element={<PreviewPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
