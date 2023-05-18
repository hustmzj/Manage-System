import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import DataType from '../../types'

let initialState: DataType[] = [];

axios.get("/api/stu/list", {
        params: {
          pageindex: 1,
          pagesize: 20,
        },
      }).then(res => initialState = res.data.list)

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setList: (state) => {
      axios.get("/api/stu/list", {
        params: {
          pageindex: 1,
          pagesize: 20,
        },
      }).then(res=> state = res.data.list)
    },
    createItem: (state, action: PayloadAction<DataType>) => {
      const item: DataType = action.payload;
      state.unshift(item);
    },
    updateItem: (state, action: PayloadAction<DataType>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteItem: (state, action: PayloadAction<DataType>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const { setList, createItem, updateItem, deleteItem } = listSlice.actions;