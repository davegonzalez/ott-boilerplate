import React from 'react';
import styled from 'styled-components';

const CommentBox = styled.div`
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.navBottomOutline}};
`;

const Avatar = styled.img`
  border-radius: 50px;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 20px;
`;

const Author = styled.div`
  font-weight: 700;
  padding-bottom: 2px;
`;

const Comment = comment => (
  <CommentBox>
    <Avatar src={comment._embedded.customer.thumbnail.small} />
    <div>
      <Author>{comment._embedded.customer.name}</Author>
      <div>{comment.content}</div>
    </div>
  </CommentBox>
);

export default Comment;
