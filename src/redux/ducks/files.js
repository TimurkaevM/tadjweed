import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  loading: false,
  progress: 0,
  loadingFiles: false,
  title: '',
  year: '',
  author: '',
  location: '',
  comment: '',
  tags_century: [],
  tags_information: [],

  files: {},

  materials: {
    title: '',

    text: {
      text: '',
      type: 'text',
      title: '',
      year: '',
      author: '',
      location: '',
      comment: '',
      tags_century: [],
      tags_information: [],
    },

    photo: {
      one: [],
      group: [],
    },

    audio: {
      one: [],
      group: [],
    },

    document: {
      one: [],
      group: [],
    },

    video: {
      one: [],
      group: [],
    },
  },
};

export default function files(state = initialState, action) {
  switch (action.type) {
    //Изменение заголовка
    case 'title/change':
      return {
        ...state,
        materials: {
          ...state.materials,
          title: action.payload,
        },
      };

    //Изменение текста
    case 'text/change':
      return {
        ...state,
        materials: {
          ...state.materials,
          text: { ...state.materials.text, text: action.payload },
        },
      };

    //Изменение тегов
    case 'tag/centuries/change':
      return {
        ...state,
        tags_century: [...state.tags_century, action.payload],
      };

    case 'tag/types/change':
      return {
        ...state,
        tags_information: [...state.tags_information, action.payload],
      };

    case 'tag/centuries/remove':
      return {
        ...state,
        tags_century: state.tags_century.filter(
          (century) => century.id !== action.payload,
        ),
      };

    case 'tag/types/remove':
      return {
        ...state,
        tags_information: state.tags_information.filter(
          (type) => type.id !== action.payload,
        ),
      };

    // Изменение текста
    case 'tag/title/change':
      return {
        ...state,
        title: action.payload,
      };

    case 'tag/place/change':
      return {
        ...state,
        location: action.payload,
      };

    case 'tag/year/change':
      return {
        ...state,
        year: action.payload,
      };

    case 'tag/author/change':
      return {
        ...state,
        author: action.payload,
      };

    case 'tag/comment/change':
      return {
        ...state,
        comment: action.payload,
      };

    //Добавление одного файла
    case 'text/upload':
      return {
        ...state,
        title: '',
        year: '',
        author: '',
        location: '',
        comment: '',
        tags_century: [],
        tags_information: [],
        materials: {
          ...state.materials,
          text: {
            ...state.materials.text,
            text: action.payload,
            title: action.title,
            year: action.year,
            author: action.author,
            location: action.location,
            comment: action.comment,
            tags_century: action.tags_century,
            tags_information: action.types,
          },
        },
      };
    //добавление одного файла
    case 'one/upload':
      return {
        ...state,
        title: '',
        year: '',
        author: '',
        location: '',
        comment: '',
        tags_century: [],
        tags_information: [],
        materials: {
          ...state.materials,
          [action.payload.type]: {
            ...state.materials[action.payload.type],
            one: [
              ...state.materials[action.payload.type].one,
              {
                id: action.payload.id,
                path: action.payload.path,
                type: action.payload.type,
                title: action.title,
                year: action.year,
                author: action.author,
                location: action.location,
                comment: action.comment,
                tags_century: action.centuries,
                tags_information: action.types,
              },
            ],
          },
        },
      };
    //отправка файла на сервер
    case 'file/post/start':
      return {
        ...state,
        loading: true,
      };

    case 'file/post/success':
      return {
        ...state,
        loading: false,
        materials: {
          ...state.materials,
          [action.format]: {
            ...state.materials[action.format],
            one: [action.payload.message],
          },
        },
      };
    //Удаление файла
    case 'file/delete/success':
      if (action.amount === 'one') {
        if (action.format === 'image') {
          return {
            ...state,
            materials: {
              ...state.materials,
              photo: {
                ...state.materials.photo,
                one: state.materials.photo.one.filter(
                  (item) => item.id !== action.id,
                ),
              },
            },
          };
        }
        if (action.format === 'application') {
          return {
            ...state,
            materials: {
              ...state.materials,
              document: {
                ...state.materials.document,
                one: state.materials.document.one.filter(
                  (item) => item.id !== action.id,
                ),
              },
            },
          };
        }
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.format]: {
              ...state.materials[action.format],
              one: state.materials[action.format].one.filter(
                (item) => item.id !== action.id,
              ),
            },
          },
        };
      }

      if (action.amount === 'group') {
        if (action.format === 'image') {
          return {
            ...state,
            materials: {
              ...state.materials,
              photo: {
                ...state.materials.photo,
                group: state.materials.photo.group
                  .map((item) => {
                    if (action.groupId === item.group) {
                      return {
                        ...item,
                        files: item.files.filter(
                          (item) => item.id !== action.id,
                        ),
                      };
                    }

                    return item;
                  })
                  .filter((item) => item.files.length !== 0),
              },
            },
          };
        }
        if (action.format === 'application') {
          return {
            ...state,
            materials: {
              ...state.materials,
              document: {
                ...state.materials.document,
                group: state.materials.document.group
                  .map((item) => {
                    if (action.groupId === item.group) {
                      return {
                        ...item,
                        files: item.files.filter(
                          (item) => item.id !== action.id,
                        ),
                      };
                    }

                    return item;
                  })
                  .filter((item) => item.files.length !== 0),
              },
            },
          };
        }
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.format]: {
              ...state.materials[action.format],
              group: state.materials[action.format].group
                .map((item) => {
                  if (action.groupId === item.group) {
                    return {
                      ...item,
                      files: item.files.filter((item) => item.id !== action.id),
                    };
                  }

                  return item;
                })
                .filter((item) => item.files.length !== 0),
            },
          },
        };
      }

      return state;

    //очистка files
    case 'state/tags/remove':
      return {
        ...state,
        files: {},
        title: '',
        year: '',
        author: '',
        location: '',
        comment: '',
        tags_century: [],
        tags_information: [],
      };

    case 'files/clear/start':
      return {
        ...state,
        files: {},
        title: '',
        year: '',
        author: '',
        location: '',
        comment: '',
        tags_century: [],
        tags_information: [],
      };

    case 'files/clear/success':
      if (action.payload.amount === 'one') {
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.payload.format]: {
              ...state.materials[action.payload.format],
              one: state.materials[action.payload.format].one.filter(
                (item) => item.id !== action.payload.file.id,
              ),
            },
          },
        };
      }

      if (action.payload.amount === 'group') {
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.payload.format]: {
              ...state.materials[action.payload.format],
              group: state.materials[action.payload.format].group.filter(
                (item) => action.payload.groupId !== item.group,
              ),
            },
          },
        };
      }

      return state;

    //добавление группы файлов
    case 'group/upload':
      if (action.format === 'application') {
        return {
          ...state,
          files: {},
          title: '',
          year: '',
          author: '',
          location: '',
          comment: '',
          tags_century: [],
          tags_information: [],
          materials: {
            ...state.materials,
            document: {
              ...state.materials.document,
              group: [
                ...state.materials.document.group,
                {
                  group: action.payload.group,
                  files: action.payload.files,
                  title: action.title,
                  year: action.year,
                  author: action.author,
                  location: action.location,
                  comment: action.comment,
                  tags_century: action.centuries,
                  tags_information: action.types,
                },
              ],
            },
          },
        };
      }
      if (action.format === 'image') {
        return {
          ...state,
          files: {},
          title: '',
          year: '',
          author: '',
          location: '',
          comment: '',
          tags_century: [],
          tags_information: [],
          materials: {
            ...state.materials,
            photo: {
              ...state.materials.photo,
              group: [
                ...state.materials.photo.group,
                {
                  group: action.payload.group,
                  files: action.payload.files,
                  title: action.title,
                  year: action.year,
                  author: action.author,
                  location: action.location,
                  comment: action.comment,
                  tags_century: action.centuries,
                  tags_information: action.types,
                },
              ],
            },
          },
        };
      }
      return {
        ...state,
        files: {},
        title: '',
        year: '',
        author: '',
        location: '',
        comment: '',
        tags_century: [],
        tags_information: [],
        materials: {
          ...state.materials,
          [action.format]: {
            ...state.materials[action.format],
            group: [
              ...state.materials[action.format].group,
              {
                group: action.payload.group,
                files: action.payload.files,
                title: action.title,
                year: action.year,
                author: action.author,
                location: action.location,
                comment: action.comment,
                tags_century: action.centuries,
                tags_information: action.types,
              },
            ],
          },
        },
      };

    case 'files/post/start':
      return {
        ...state,
        loadingFiles: true,
      };

    case 'files/post/success':
      return {
        ...state,
        loadingFiles: false,
        files: action.payload.message,
        progress: 0,
      };

    case 'draft/load/start':
      return {
        ...state,
        loading: true,
      };

    case 'draft/load/success':
      function getGroupFiles(arr) {
        const result = [];
        const object = {};

        for (let i = 0; i < arr.length; i++) {
          if (!result.includes(arr[i].group_uid)) {
            result.push(arr[i].group_uid);
          }
        }

        for (let i = 0; i < result.length; i++) {
          object[result[i]] = {
            group_uid: '',
            type: '',
            files: [],
          };
        }

        for (let i = 0; i < arr.length; i++) {
          object[arr[i].group_uid].group_uid = arr[i].group_uid;
          object[arr[i].group_uid].type = arr[i].type;
          object[arr[i].group_uid].files.push(arr[i]);
        }
        return Object.values(object);
      }

      return {
        ...state,
        loading: false,
        materials: {
          ...state.materials,
          photo: {
            one: action.payload.message.photo.filter(
              (item) => item.group_uid === null,
            ),
            group: getGroupFiles(
              action.payload.message.photo.filter(
                (item) => item.group_uid !== null,
              ),
            ),
          },

          audio: {
            one: action.payload.message.audio.filter(
              (item) => item.group_uid === null,
            ),
            group: getGroupFiles(
              action.payload.message.audio.filter(
                (item) => item.group_uid !== null,
              ),
            ),
          },

          document: {
            one: action.payload.message.document.filter(
              (item) => item.group_uid === null,
            ),
            group: getGroupFiles(
              action.payload.message.document.filter(
                (item) => item.group_uid !== null,
              ),
            ),
          },

          video: {
            one: action.payload.message.video.filter(
              (item) => item.group_uid === null,
            ),
            group: getGroupFiles(
              action.payload.message.video.filter(
                (item) => item.group_uid !== null,
              ),
            ),
          },
        },
      };

    case 'change/files/tags':
      return {
        ...state,
        title: action.payload.title ? action.payload.title : '',
        year: action.payload.year ? action.payload.year : '',
        author: action.payload.author ? action.payload.author : '',
        location: action.payload.location ? action.payload.location : '',
        comment: action.payload.comment ? action.payload.comment : '',
        tags_century: action.payload.centuries ? action.payload.centuries : [],
        tags_information: action.payload.types ? action.payload.types : [],
      };

    case 'change/files/success':
      if (action.format === 'text') {
        return {
          ...state,
          materials: {
            ...state.materials,
            text: {
              ...state.materials.text,
              title: action.title,
              year: action.year,
              author: action.author,
              location: action.location,
              comment: action.comment,
              tags_century: action.centuries,
              tags_information: action.types,
            },
          },
        };
      }

      if (action.amount === 'one') {
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.format]: {
              ...state.materials[action.format],
              one: state.materials[action.format].one.map((item) => {
                if (item.id === action.id) {
                  item.title = action.title;
                  item.year = action.year;
                  item.author = action.author;
                  item.location = action.location;
                  item.comment = action.comment;
                  item.tags_century = action.centuries;
                  item.tags_information = action.types;
                }

                return item;
              }),
            },
          },
        };
      }

      if (action.amount === 'group') {
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.format]: {
              ...state.materials[action.format],
              group: state.materials[action.format].group.map((item) => {
                if (item.id === action.id) {
                  item.title = action.title;
                  item.year = action.year;
                  item.author = action.author;
                  item.location = action.location;
                  item.comment = action.comment;
                  item.tags_century = action.centuries;
                  item.tags_information = action.types;
                }

                return item;
              }),
            },
          },
        };
      }

      return state;

    case 'change/progress':
      return {
        ...state,
        progress: action.payload,
      };

    default:
      return state;
  }
}

// Тэги
export const addedCenturies = (value) => {
  return {
    type: 'tag/centuries/change',
    payload: value,
  };
};

export const addedTypes = (value) => {
  return {
    type: 'tag/types/change',
    payload: value,
  };
};

export const removeCenturies = (id) => {
  return {
    type: 'tag/centuries/remove',
    payload: id,
  };
};

export const removeTypes = (id) => {
  return {
    type: 'tag/types/remove',
    payload: id,
  };
};

// Тексты
export const changeTitle = (value) => {
  return {
    type: 'title/change',
    payload: value,
  };
};

export const changeTitleTag = (value) => {
  return {
    type: 'tag/title/change',
    payload: value,
  };
};

export const changePlaceTag = (value) => {
  return {
    type: 'tag/place/change',
    payload: value,
  };
};

export const changeYearTag = (value) => {
  return {
    type: 'tag/year/change',
    payload: value,
  };
};

export const changeAuthorTag = (value) => {
  return {
    type: 'tag/author/change',
    payload: value,
  };
};

export const changeCommentTag = (value) => {
  return {
    type: 'tag/comment/change',
    payload: value,
  };
};

export const changeText = (value) => {
  return {
    type: 'text/change',
    payload: value,
  };
};

// Файлы
export const UploadOneFail = (
  file,
  format,
  title,
  year,
  author,
  location,
  comment,
  centuries,
  types,
) => {
  return {
    type: 'one/upload',
    payload: file,
    format,
    title,
    year,
    author,
    location,
    comment,
    centuries,
    types,
  };
};

export const UploadTextFail = (
  title,
  year,
  author,
  location,
  comment,
  centuries,
  types,
  file,
) => {
  return {
    type: 'text/upload',
    payload: file,
    title,
    year,
    author,
    location,
    comment,
    centuries,
    types,
  };
};

export const UploadGroupFails = (
  file,
  format,
  title,
  year,
  author,
  location,
  comment,
  centuries,
  types,
) => {
  return {
    type: 'group/upload',
    payload: file,
    format,
    title,
    year,
    author,
    location,
    comment,
    centuries,
    types,
  };
};

export const RemoveStateTags = () => {
  return {
    type: 'state/tags/remove',
  };
};

export const deleteOneFail = (id, format, amount, groupId) => {
  return (dispatch) => {
    dispatch({
      type: 'file/delete/start',
      payload: id,
      format,
      amount,
      groupId,
    });

    api
      .delete(`/user/draft/file/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'file/delete/success',
          payload: data,
          id,
          format,
          amount,
          groupId,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const clearFiles = (files, info) => {
  if (info.amount === 'one') {
    return (dispatch) => {
      dispatch({
        type: 'files/clear/start',
        files,
      });

      api
        .delete(`/draft/file/delete/${files.id}`, {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        })
        .then((response) => response.data)
        .then((data) => {
          dispatch({
            type: 'files/clear/success',
            payload: info,
            message: data,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    };
  }

  return (dispatch) => {
    dispatch({
      type: 'files/clear/start',
      files,
    });

    files.files.forEach((item) => {
      api
        .delete(`/draft/file/delete/${item.id}`, {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        })
        .then((response) => response.data)
        .then((data) => {
          dispatch({
            type: 'files/clear/success',
            payload: info,
            message: data,
          });
        })
        .catch((e) => {
          console.error(e.data);
        });
    });
  };
};

export const postFail = (file, format) => {
  const form = new FormData();
  form.append('file', {
    uri: file[0].uri,
    name: file[0].filename,
    type: 'image/jpeg',
  });
  form.append('type', format);

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: 'files/post/start', file, format, value, form });

      if (value !== null) {
        const response = await api.post('/user/draft/file', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length',
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength,
              );
              dispatch({
                type: 'change/progress',
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: 'files/post/success',
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const postFailDocument = (file, format) => {
  const form = new FormData();
  form.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  });
  form.append('type', format);

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: 'files/post/start', file, format, value, form });

      if (value !== null) {
        const response = await api.post('/user/draft/file', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length',
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength,
              );
              dispatch({
                type: 'change/progress',
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: 'files/post/success',
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const postFilesGroup = (files, format, causes) => {
  const form = new FormData();
  form.append('type', format);
  for (let i = 0; i < files.length; i++) {
    form.append(`files[${i}]`, {
      uri: files[i].uri,
      name: files[i].filename,
      type: 'image/jpeg',
    });
  }

  for (let i = 0; i < causes.length; i++) {
    form.append(`causes[${i}]`, causes[i]);
  }

  // return (dispatch) => {
  //   dispatch({ type: 'files/post/start', files, format, causes });

  //   api
  //     .post('/user/draft/group', form, {
  //       headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
  //       onUploadProgress: (progressEvent) => {
  //         const totalLength = progressEvent.lengthComputable
  //           ? progressEvent.total
  //           : progressEvent.target.getResponseHeader('content-length') ||
  //             progressEvent.target.getResponseHeader(
  //               'x-decompressed-content-length',
  //             );
  //         if (totalLength) {
  //           let progress = Math.round(
  //             (progressEvent.loaded * 100) / totalLength,
  //           );
  //           dispatch({
  //             type: 'change/progress',
  //             payload: progress,
  //           });
  //         }
  //       },
  //     })
  //     .then((response) => response.data)
  //     .then((data) => {
  //       dispatch({
  //         type: 'files/post/success',
  //         payload: data,
  //         format,
  //       });
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: 'files/post/start', files, format, causes });

      if (value !== null) {
        const response = await api.post('/user/draft/group', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length',
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength,
              );
              dispatch({
                type: 'change/progress',
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: 'files/post/success',
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const getDraftFiles = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: 'draft/load/start',
      });

      if (value !== null) {
        const response = await api.get('user/drafts', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: 'draft/load/success',
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

//Изменение принадлежностей файлов

export const ChangeFilesTags = (file) => {
  return {
    type: 'change/files/tags',
    payload: file,
  };
};

export const ChangeFiles = (
  id,
  format,
  amount,
  group,
  title,
  year,
  author,
  location,
  comment,
  centuries,
  types,
) => {
  return {
    type: 'change/files/success',
    id,
    format,
    amount,
    group,
    title,
    year,
    author,
    location,
    comment,
    centuries,
    types,
  };
};

// api/user/add/material/send

export const postMaterial = (title, text, photo, document, video, audio) => {
  return (dispatch) => {
    dispatch({ type: 'material/post/start' });

    api
      .post(
        '/user/contribution/material/send',
        { title, text, photo, document, audio, video },
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        },
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'material/post/success',
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
