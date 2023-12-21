import { format , formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'
import { Avatar } from './Avatar';
import { Comment } from './Comentario';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

// author: {avtar_url: '', name: "", rule: ""};
// publishedAt: date;
// content: string;

interface Author{
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content{
  type: "paragraph" | "link";
  content: string;
}


export interface PostType{
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps{
  post: PostType;
}

export function Post ({ post }: PostProps){

  const [comments, SetComments] = useState([
    'Post muito bacana!'
  ]) 

  const [newCommentText, setNewCommentText] = useState('')

  function handleCreateNewComment(event: FormEvent){
    event.preventDefault();

    SetComments([...comments, newCommentText])
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
    
  }

  const publishedDateFormat = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr,
  })

  const publishedDateRelativeNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBr,
    addSuffix: true,
  })

  function randleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse compo é obrigatório!')
    
  }

  function deleteComment(commentToDelete:string){
    const commentWithoutDeleteOne = comments.filter(comment =>{
      return( comment !== commentToDelete

      )
    })

    SetComments(commentWithoutDeleteOne);  
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return(
    <article className={styles.post}>
      
      <header>
        <div className={styles.author}>
          <Avatar             
            src={post.author.avatarUrl}
          />
          <div className={styles.authorInfo}> 
            <strong> {post.author.name}</strong>
            <span> {post.author.role} </span>
          </div>
        </div>

        <time title={publishedDateFormat} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line =>{
          if (line.type === 'paragraph'){
            return(
              <p key={line.content}>{line.content}</p>
            );
          }else if (line.type === 'link'){
            return(
              <p key={line.content}><a href="">{line.content}</a></p>
            );
          }
        })}
      </div>  

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name='comment'
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={randleNewCommentInvalid}
          required
        />
        <footer>
          <button 
            type='submit' 
            disabled={isNewCommentEmpty}> Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment =>{
          return(
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
      
    </article>
  )
}