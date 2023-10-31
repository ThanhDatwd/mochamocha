/* eslint-disable quotes */
/* eslint-disable semi */
const { GET_DB } = require("~/config/mongodb");

const syntax = async (id) => {
  const COLLECTION_NAME = "";
  //   FIND
  await GET_DB().collection(COLLECTION_NAME).find({ key: "value" });
  // {key:{$gt:value}}  : >
  // {key:{$gte:value}} : >=
  // {key:{$lt:value}}  : <
  // {key:{$lte:value}} : <=
  // {key:{$in:value}}  : in
  // {key:{$nin:value}} : not in
  //  FIND OR
  // {$or:[{key:value},{key:value},{key:{$lt:value}}]} : or
  // {$size:[{key:value}} key là mảng và có length >=value
  // {key:{$elemtMatch:{key:value}}} : find các phần tử dạng array of embedded
  // {key:{$exists:boolean}} : kiểm tra property đó có tồn tại hay không
  // {key:{$exists:boolean}} : kiểm tra property đó có tồn tại hay không
  // .skip(x).limit(y) : lấy từ phần tử số bn và lấy bao nhiêu phần tử
  // .count(x) : Đếm số lượng phần tử
  // .sort({key:x}) : x = 1 asc, x = -1 desc
  //   ATOMIC
  await GET_DB()
    .collection(COLLECTION_NAME)
    .updateOne(
      { key: "value" },
      {
        $inc: { key: "value" }, // tăng một trường lên số đơn vị mong muốn
        $push: { key: "value" }, // thêm vào mảng key 1 phần tử
        $pull: { key: "value" }, // xoá 1 phần tử trong mảng key
        $addToSet: { key: "value" }, // chỉ thêm vào khi phần tử đó chưa tồn tại trong mảng
      }
    );
  await GET_DB().collection(COLLECTION_NAME).drop(); // xoá collection;
};
