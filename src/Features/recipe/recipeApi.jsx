import { apiSlice } from '../../Api/authApi';

apiSlice.enhanceEndpoints({ addTagTypes: ['Recipe'] });

const recipeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipe: builder.query({
      query: () => ({
        url: 'recipes',
      }),
      providesTags: (result, error, arg) => (result ? [...result.map((data) => ({ type: 'Recipe', data }))] : ['Recipe']),
      transformResponse: (response, meta, arg) => response,
    }),

    getRecipeById: builder.query({
      query: (id) => ({
        url: `recipes/${id}`,
      }),
      providesTags: (result, error, arg) => (result ? [...result.map((data) => ({ type: 'Recipe', data }))] : ['Recipe']),
      transformResponse: (response, meta, arg) => response,
    }),

    createRecipe: builder.mutation({
      query: (data) => ({
        url: `recipes`,
        method: 'POST',
        body: data,
      }),

      invalidatesTags: ['Recipe'],
      transformResponse: (response, meta, arg) => response,
    }),

    updateRecipeById: builder.mutation({
      query: ({ id, data }) => ({
        url: `recipes/${id}`,
        method: 'PUT',
        body: data,
      }),

      transformResponse: (response, meta, arg) => response,
    }),

    deleteRecipeById: builder.mutation({
      query: (id) => ({
        url: `recipes/${id}`,
        method: 'DELETE',
      }),

      transformResponse: (response, meta, arg) => response,
    }),
  }),
});

export const { useGetAllRecipeQuery, useGetRecipeByIdQuery, useCreateRecipeMutation, useDeleteRecipeByIdMutation, useUpdateRecipeByIdMutation } = recipeApi;
