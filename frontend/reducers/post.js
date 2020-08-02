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
          src:
            'https://cdn.pixabay.com/photo/2020/07/22/12/08/cats-eyes-5428855_1280.jpg',
        },
        {
          src:
            'https://cdn.pixabay.com/photo/2020/07/02/07/06/goldcrest-5361996_1280.jpg',
        },
        {
          src:
            'https://cdn.pixabay.com/photo/2020/06/20/01/24/frog-5319326_1280.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'socute',
          },
          content: '너무 귀엽네요 ~!',
        },
        {
          User: {
            nickname: 'fantastic',
          },
          content: '눈정화 하고 갑니다',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};
const dummyPost = {
  id: 2,
  content: 'dummy data',
  User: {
    id: 1,
    nickname: 'bongjoi',
  },
  Images: [],
  Comments: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default postReducer;
