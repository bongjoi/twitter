import shortId from 'shortid';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const addCommentAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'bongjoi',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          id: shortId.generate(),
          src: 'https://cdn.pixabay.com/photo/2020/07/22/12/08/cats-eyes-5428855_1280.jpg',
        },
        {
          id: shortId.generate(),
          src: 'https://cdn.pixabay.com/photo/2020/07/02/07/06/goldcrest-5361996_1280.jpg',
        },
        {
          id: shortId.generate(),
          src: 'https://cdn.pixabay.com/photo/2020/06/20/01/24/frog-5319326_1280.jpg',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'socute',
          },
          content: '너무 귀엽네요 ~!',
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'fantastic',
          },
          content: '눈정화 하고 갑니다',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'bongjoi',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (userId, data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: userId,
    nickname: 'bongjoi',
  },
});

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = state.mainPosts[postIndex];
      const Comments = [dummyComment(action.data.userId, action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default postReducer;
