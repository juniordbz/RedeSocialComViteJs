import { Header } from './Components/Header'
import {Post, PostType}  from './Components/Post'
import { Sidebar } from './Components/Sidebar'
import styles from './App.module.css'
import './global.css'

const posts: PostType[]= [
  {
    id: 1,
    author:{
      avatarUrl: 'http://github.com/juniordbz.png',
      name: 'Francisco Bezerra',
      role: 'CTO Rocktseat'
    },
    content: [
        {type: 'paragraph', content: 'Fala galeraa 👋'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content:'jane.design/doctorcare'}   
    ],
    publishedAt: new Date('2023-12-14 20:44:00'),
  },
  {
    id: 2,
    author:{
      avatarUrl: 'http://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO Rocktseat'
    },
    content: [
        {type: 'paragraph', content: 'Fala galeraa 👋'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content:'jane.design/doctorcare'}   
    ],
    publishedAt: new Date('2023-12-12 22:44:00'),
  },
];

export function App() {

  return (
    <div>

      <Header/>
    
      <div className={styles.wrapper}>
      <Sidebar/>
        <main>
          {posts.map(post => {
            return(
              <Post
                key={post.id}
                post={post}
              />

            )          
          })}
        </main>
      </div>
   
    </div>
    )
}
 

