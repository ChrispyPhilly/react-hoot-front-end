// src/components/HootDetails/HootDetails.jsx
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as hootService from '../../services/hootService';
import CommentForm from '../CommentForm/CommentForm';


  const HootDetails = (props) => {
    const [hoot, setHoot] = useState(null);
    // Add the following
    const user = useContext(AuthedUserContext);
    const { hootId } = useParams();
console.log('hootId', hootId);

useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      console.log('hootData', hootData);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);
  
  // Verify that hoot state is being set correctly:
  console.log('hoot state:', hoot);


    const handleAddComment = async (commentFormData) => {
      
        const newComment = await hootService.createComment(hootId, commentFormData);
        setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
      };
    if (!hoot) return <main>Loading...</main>;
    return (
        <main>
          <header>
  <p>{hoot.category.toUpperCase()}</p>
  <h1>{hoot.title}</h1>
  <p>
    {hoot.author.username} posted on
    {new Date(hoot.createdAt).toLocaleDateString()}
  </p>
    {hoot.author._id === user._id && (
    <>
      <Link to={`/hoots/${hootId}/edit`}>Edit</Link>

      <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>
    </>
  )}
</header>
          <p>{hoot.text}</p>
          <section>
          <h2>Comments</h2>
          <CommentForm handleAddComment={handleAddComment} />

  {!hoot.comments.length && <p>There are no comments.</p>}

  {hoot.comments.map((comment) => (
    <article key={comment._id}>
      <header>
        <p>
          {comment.author.username} posted on
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{comment.text}</p>
    </article>
  ))}
</section>
        </main>
      );
  

  }

  export default HootDetails;
