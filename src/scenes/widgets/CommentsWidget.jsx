import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { setPost } from "state";
import { BASE_URL } from "constants";

const CommentsWidget = ({ name, postComments, postId }) => {
    const token = useSelector((state) => state.token);
    const [comments, setComments] = useState(postComments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const { palette } = useTheme();
    const main = palette.neutral.main;

    const commentPost = async (value) => {
        const response = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ value: value }),
        });
        const updatedPost = await response.json();
        setComments(updatedPost?.comments);
        setComment('');
        dispatch(setPost({ post: updatedPost }));
    }

    const handleClick = () => {
        commentPost(comment);
    }

    return (
        <>
            {comments.length > 0 && 
            <>
                <Typography sx={{ color: main, m: "0.5rem 0",pl: "0.5rem"  }} gutterBottom variant="h6">Comments</Typography>
                {comments.map((comment, i) => (
                    <Box key={`${name}-${i}`}>
                        <Divider />
                        <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                            {comment}
                        </Typography>

                    </Box>
                
                ))}
            </>
            }
            
            <Box>
            <Typography sx={{ color: main, m: "1rem 0 0.5rem 0", pl: "0.5rem"  }} gutterBottom variant="h6"> Write a comment</Typography>
            <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
                Comment
            </Button>
            </Box>
        </>
    );
};

export default CommentsWidget;
