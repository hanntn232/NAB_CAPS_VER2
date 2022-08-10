import React, { useEffect } from "react";
import { useState } from "react";
import './App.css';
import '../owner/Owner.scss'
import { useMutationAddProduct } from "../../data/mutations/add-product";
import { useMutationRemoveProduct } from "../../data/mutations/remove-product";
import { useQueryGetProducts } from '../../data/queries/get-products';
import { ProductInputForm } from "./InputForm/inputForm";
import Footer from '../../common/Footer/Footer'
import Header from '../../common/Header/Header'

const defaultData = [
    {
        "id": "0e00c042-dc25-43d3-8570-660a058a2b77",
        "name": "Nike ZoomX Invincible Run Flyknit 2",
        "price": 500,
        "stock": 100,
        "description": "Men's Road Running Shoes",
        "categories": [
            "Men",
            "Running Shoes"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5b3769cc-b1a2-4927-9368-1294727191fa/zoomx-invincible-run-flyknit-2-road-running-shoes-xrCMmF.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/7f8648a9-6f79-41f4-93b0-07a9015d0bc2/zoomx-invincible-run-flyknit-2-mens-road-running-shoes-gxNJpn.png",
            "https://static.nike.com/a/videos/q_90,vc_vp9/aa95b88e-57d9-4e42-8d4b-40ec4fb61225/video.webm",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/023ca8d5-882c-475a-91a7-75cf4ec76d98/zoomx-invincible-run-flyknit-2-mens-road-running-shoes-gxNJpn.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/a0f8fef5-eca7-4f6c-b083-8963b3ba7ef3/zoomx-invincible-run-flyknit-2-mens-road-running-shoes-gxNJpn.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/05726788-8a65-45e8-a473-8fe19a1ade6e/zoomx-invincible-run-flyknit-2-mens-road-running-shoes-gxNJpn.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/7fd2fbde-e932-4e2c-95ff-c1ba9181e89f/zoomx-invincible-run-flyknit-2-mens-road-running-shoes-gxNJpn.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/f1c61f3a-463d-410b-903a-ffd8ed5bad45/zoomx-invincible-run-flyknit-2-mens-road-running-shoes-gxNJpn.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/bda290fd-391c-4eac-8cfa-8697aec82658/zoomx-invincible-run-flyknit-2-mens-road-running-shoes-gxNJpn.png"
        ],
        "colors": [
            {
                "name": "White",
                "hexValue": "#fff"
            },
            {
                "name": "Black",
                "hexValue": "#000"
            }
        ],
        "sizes": [
            "5",
            "5.5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "9",
            "11"
        ],
        "featuringFrom": "31/07/2022",
        "featuringTo": "25/08/2022"
    },
    {
        "id": "165bd5cf-f23d-48ec-9ad2-a4babcbc0580",
        "name": "Nike Air Force 1 '07",
        "price": 130,
        "stock": 100,
        "description": "Unisex Shoes",
        "categories": [
            "Men",
            "Women",
            "Unisex",
            "Shoes"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-mens-shoes-5QFp5Z.png",
            "https://static.nike.com/a/videos/q_90,vc_vp9/d58e9afa-e042-497c-917d-d625c432b72b/video.webm",
            "https://static.nike.com/a/videos/q_90,vc_vp9/d476110d-5eec-429d-b9a7-7360d199d3f1/video.webm",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/a0a300da-2e16-4483-ba64-9815cf0598ac/air-force-1-07-mens-shoes-5QFp5Z.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/82aa97ed-98bf-4b6f-9d0b-31a9f907077b/air-force-1-07-mens-shoes-5QFp5Z.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-5QFp5Z.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/00375837-849f-4f17-ba24-d201d27be49b/air-force-1-07-mens-shoes-5QFp5Z.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-mens-shoes-5QFp5Z.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/3cc96f43-47b6-43cb-951d-d8f73bb2f912/air-force-1-07-mens-shoes-5QFp5Z.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/5dbeb615-bdee-4737-9a94-ab7c67bd9219/air-force-1-07-womens-shoes-GCkPzr.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/cb1fa13c-a1bf-4477-8b7c-78ac7bc16f80/air-force-1-07-womens-shoes-GCkPzr.png"
        ],
        "colors": [
            {
                "name": "White",
                "hexValue": "#fff"
            },
            {
                "name": "Black",
                "hexValue": "#000"
            }
        ],
        "sizes": [
            "5",
            "5.5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "9",
            "11"
        ],
        "featuringFrom": "01/08/2022",
        "featuringTo": "25/08/2022"
    },
    {
        "id": "b3131ffe-f034-4b0e-ab55-cfca897f7106",
        "name": "Nike Air Max 97",
        "price": 1000,
        "stock": 100,
        "description": "Men's Shoes",
        "categories": [
            "Men",
            "Shoes"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/yzytjyjnar2wzjiriibk/air-max-97-mens-shoes-LJmK45.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d7yyh7rta3tkye7kdyka/air-max-97-mens-shoes-LJmK45.png",
            "https://static.nike.com/a/videos/q_90,vc_vp9/efab0a5d-f63a-4cc3-bbbe-1a94e1c61e9a/video.webm",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/rf8iyzxjwhzwcn9t6vfg/air-max-97-mens-shoes-LJmK45.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fb1pzyv6e0lg2hfoja8f/air-max-97-mens-shoes-LJmK45.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/nhxokoi14g1tsxoqn6sy/air-max-97-mens-shoes-LJmK45.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/tnrxjg9g224nupmwrrys/air-max-97-mens-shoes-LJmK45.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/xz10qxggewfcr0u1hkhw/air-max-97-mens-shoes-LJmK45.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/n3b8ecnvnvb5wqxapybw/air-max-97-mens-shoes-LJmK45.png"
        ],
        "colors": [
            {
                "name": "Black",
                "hexValue": "#000"
            },
            {
                "name": "White",
                "hexValue": "#FFF"
            }
        ],
        "sizes": [
            "5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "9",
            "11"
        ],
        "featuringFrom": "31/07/2022",
        "featuringTo": "25/08/2022"
    },
    {
        "id": "832c4a9a-082a-4a8a-b89e-46e738cf82a9",
        "name": "Nike Ryz 365 2",
        "price": 85,
        "stock": 40,
        "description": "Women's Shoes",
        "categories": [
            "Women",
            "Shoes"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5c2a3c54-65c7-4102-847d-546ed9b80efc/ryz-365-2-womens-shoes-LkNlGp.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c7e43e9a-1d20-4b94-9378-925a6bc2f29c/ryz-365-2-womens-shoes-LkNlGp.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/7fbbbae0-6c5c-4bd0-a50b-c9b33398576e/ryz-365-2-womens-shoes-LkNlGp.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/8839dc28-c185-4429-a262-dea3aadf8205/ryz-365-2-womens-shoes-LkNlGp.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/52299c6d-f0e7-4323-8a22-eaab1f0caff3/ryz-365-2-womens-shoes-LkNlGp.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/36fad7ef-1012-43c7-abbc-2813d5f1a84e/ryz-365-2-womens-shoes-LkNlGp.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/42da095d-2b38-41c1-ae84-7ce652fd8829/ryz-365-2-womens-shoes-LkNlGp.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/320cbe8e-d552-4e59-b8b3-108683b26736/ryz-365-2-womens-shoes-LkNlGp.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b218486b-57d8-4b3a-99a3-886445bce878/ryz-365-2-womens-shoes-LkNlGp.png"
        ],
        "colors": [
            {
                "name": "Pink",
                "hexValue": "#cdb1a9"
            }
        ],
        "sizes": [
            "5",
            "5.5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "8.5",
            "9.5",
            "10",
            "11"
        ]
    },
    {
        "id": "4d8349e8-f6d2-4240-bfea-1a050efffaef",
        "name": "Nike SB Zoom Blazer Mid PRM",
        "price": 800,
        "stock": 70,
        "description": "Unisex Skate Shoes",
        "categories": [
            "Men",
            "Women",
            "Unisex",
            "Skateboarding"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bf6043cb-73ee-4e4d-9044-aba743bcacec/sb-zoom-blazer-mid-prm-skate-shoes-cDgJVQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c9b91d8a-d9c7-4ec1-a17b-9e1e0dd15b11/sb-zoom-blazer-mid-prm-skate-shoes-cDgJVQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/99fc9898-61c6-4fc7-8880-c32fd3e659f4/sb-zoom-blazer-mid-prm-skate-shoes-cDgJVQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fdccfa2e-f315-46aa-8483-9e4251c3edd2/sb-zoom-blazer-mid-prm-skate-shoes-cDgJVQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/0351b64a-6f82-43f5-8e0b-08fba0c8f0f8/sb-zoom-blazer-mid-prm-skate-shoes-cDgJVQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9afc6a2f-74ef-405c-87d0-6f6e48f04cc6/sb-zoom-blazer-mid-prm-skate-shoes-cDgJVQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/76e0799f-eb74-48b1-ba41-9d3af72167f3/sb-zoom-blazer-mid-prm-skate-shoes-cDgJVQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/cf935307-a7d9-4efd-a580-78b103137294/sb-zoom-blazer-mid-prm-skate-shoes-cDgJVQ.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/16bbd8ca-5de0-4a11-9e12-54c63b99cd3f/sb-zoom-blazer-mid-prm-skate-shoes-cDgJVQ.png"
        ],
        "colors": [
            {
                "name": "Orange",
                "hexValue": "#e99b66"
            }
        ],
        "sizes": [
            "7"
        ]
    },
    {
        "id": "3a2be3b0-a7d4-4bed-a982-10860748058e",
        "name": "Nike Free Metcon 4",
        "price": 650,
        "stock": 30,
        "description": "Women's Training Shoes",
        "categories": [
            "Women",
            "Training & Gym"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3d3dd8d7-e864-43af-833e-b2b33ab703aa/free-metcon-4-womens-training-shoes-pxHVt9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1b36b256-9c42-49ad-afb5-db0e337a453e/free-metcon-4-womens-training-shoes-pxHVt9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/2813345f-37d6-4480-8bb1-36b9431a169f/free-metcon-4-womens-training-shoes-pxHVt9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/77495364-fbbd-4a28-ba94-e9350dc93bd8/free-metcon-4-womens-training-shoes-pxHVt9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b01db23d-41f4-4a36-a19d-fb72b5c72e6c/free-metcon-4-womens-training-shoes-pxHVt9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/897b359d-f2f8-4379-b875-549aadbf52d6/free-metcon-4-womens-training-shoes-pxHVt9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/f3d3afc8-96a4-4e38-9943-18380131d0e2/free-metcon-4-womens-training-shoes-pxHVt9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/bd66a78d-3b57-4bf5-8d3c-7607b17f8ab5/free-metcon-4-womens-training-shoes-pxHVt9.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/f8cd6fc2-25dd-4d28-9356-5cba745bf257/free-metcon-4-womens-training-shoes-pxHVt9.png"
        ],
        "colors": [
            {
                "name": "Aquamarine",
                "hexValue": "#7fffd4"
            },
            {
                "name": "University Blue",
                "hexValue": "#3e99dc"
            }
        ],
        "sizes": [
            "5",
            "5.5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "11",
            "12",
            "12.5"
        ],
        "featuringFrom": "20/08/2022",
        "featuringTo": "25/08/2022"
    },
    {
        "id": "7f141e74-2362-4a14-b66c-d1f5f234b67c",
        "name": "Nike Air Force 1 '07 LV8 Next Nature",
        "price": 1850,
        "stock": 80,
        "description": "Unisex Shoes",
        "categories": [
            "Men",
            "Women",
            "Unisex",
            "Shoes"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/74c5cc3e-375d-4663-b1db-7f6f81242aab/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/5e69767d-949c-49ff-bc6d-558b8f0c14cd/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png",
            "https://static.nike.com/a/videos/q_90,vc_vp9/685da4af-9518-4adb-aade-e75b7f4230ac/video.webm",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4658ed29-9c60-4522-8e63-60ed1488469e/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/83caf0c6-367d-4073-bedc-14152618416d/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/6da2a252-6675-4085-b5bd-09d1f2ebcf7e/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/3567aea4-0fb0-4d99-a4b4-80c6b56a0d42/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/0c4281fd-670c-4a9d-b9df-b8f98e815596/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/df01bb8f-3638-4bd1-a4e9-f804dab66837/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/81f53af2-4c37-4dd2-b635-3b0402cb8f1f/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/f4c03682-6e69-44fb-9bcc-905aee39d183/air-force-1-07-lv8-next-nature-mens-shoes-bdFBs8.png"
        ],
        "colors": [
            {
                "name": "White",
                "hexValue": "#fff"
            }
        ],
        "sizes": [
            "5",
            "5.5",
            "6",
            "7",
            "7.5",
            "10",
            "11",
            "12",
            "12.5"
        ]
    },
    {
        "id": "ec89e068-ec50-42d1-b284-50bf34364b5a",
        "name": "Air Jordan 1 Mid",
        "price": 1200,
        "stock": 100,
        "description": "Unisex Shoes",
        "categories": [
            "Men",
            "Women",
            "Unisex",
            "Shoes",
            "Jordan"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3cc67bbc-9d4f-47b0-8268-fcbe34df4c41/air-jordan-1-mid-shoes-tFvhbH.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/60f88cfd-863d-4fb0-abe2-e4cddcd7298e/air-jordan-1-mid-shoes-tFvhbH.png",
            "https://static.nike.com/a/videos/q_90,vc_vp9/2739e771-b40a-492e-93c8-b081d477086a/video.webm",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/233da4c8-504f-481e-abac-74a1a1c93b0e/air-jordan-1-mid-shoes-tFvhbH.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e1f02082-ef1a-4507-a22c-33a6906ba636/air-jordan-1-mid-shoes-tFvhbH.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/7dcd064e-48c5-4ccb-abcf-10ba9f8907c0/air-jordan-1-mid-shoes-tFvhbH.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/7a917412-4484-427e-b9e7-61274e9eabb0/air-jordan-1-mid-shoes-tFvhbH.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/a3840d69-bfab-413a-8d1d-7f1d02e324b1/air-jordan-1-mid-shoes-tFvhbH.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d87994b3-3c84-449d-90d6-b57181797145/air-jordan-1-mid-shoes-tFvhbH.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fd494c1d-f117-4901-a42d-43ab1e27845f/air-jordan-1-mid-shoes-tFvhbH.png"
        ],
        "colors": [
            {
                "name": "Aquamarine",
                "hexValue": "#7fffd4"
            }
        ],
        "sizes": [
            "7",
            "7.5",
            "8.5",
            "9",
            "9.5",
            "10",
            "11",
            "12",
            "12.5"
        ]
    },
    {
        "id": "2e3c0ec7-c897-4dbd-9c8b-e4b5d5519126",
        "name": "Nike Air Zoom Pegasus 39",
        "price": 350,
        "stock": 70,
        "description": "Women's Running Shoes",
        "categories": [
            "Women",
            "Running Shoes"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8ac8f22d-a9af-4255-aa79-5c83e73a0757/air-zoom-pegasus-39-womens-road-running-shoes-Wck51L.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/89a3c86c-2a5e-4fbe-ac92-5d1077d13182/air-zoom-pegasus-39-womens-road-running-shoes-Wck51L.png",
            "https://static.nike.com/a/videos/q_90,vc_vp9/85e87828-d60a-4222-94e4-630f6fa8fd0a/video.webm",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ee7022a3-b099-4bfa-9bab-d5052ce1b1c3/air-zoom-pegasus-39-womens-road-running-shoes-Wck51L.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ffc10a1a-835b-4292-9658-a5b32ed98ccc/air-zoom-pegasus-39-womens-road-running-shoes-Wck51L.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/96e08d41-f4af-4c34-9591-717c20b00499/air-zoom-pegasus-39-womens-road-running-shoes-Wck51L.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/97696125-ba37-4ff7-b811-691041d0f164/air-zoom-pegasus-39-womens-road-running-shoes-Wck51L.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/31060365-58b7-4009-b53a-5d4cfcb5ba0d/air-zoom-pegasus-39-womens-road-running-shoes-Wck51L.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f4451a29-38c6-4b4b-811d-4266d1061b01/air-zoom-pegasus-39-womens-road-running-shoes-Wck51L.png"
        ],
        "colors": [
            {
                "name": "Orange",
                "hexValue": "#e99b66"
            }
        ],
        "sizes": [
            "5",
            "5.5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "11",
            "12"
        ]
    },
    {
        "id": "42fd2625-a3e2-4718-b980-403f847f336d",
        "name": "Nike Air Force 1 '07 Premium",
        "price": 140,
        "stock": 1,
        "description": "Unisex Shoes",
        "categories": [
            "Women",
            "Shoes"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/23768062-26f4-492a-a4df-d0242dd5d4ca/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f1c3937e-ca87-4565-98a4-3ad0f119b64f/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/82b5bc91-3552-4238-979f-04d5b1c6eab8/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/91d01674-ec3e-4a45-a7cb-8661498be113/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b1e941ec-0064-48a6-b4d6-b94366b45035/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/445f5c47-221d-47d5-874b-3d5860aee256/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/37b4ae73-9c12-488d-aee9-ff2a0fb2ae19/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f1b2baaf-ed4b-4e8d-8d08-899f4206a9bd/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e88276ea-a14b-4de0-9095-195d54ff54a7/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b3b856b1-4b02-4551-8fe0-9e394290c3cf/air-force-1-07-premium-womens-shoes-qQJZBs.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/294af148-5ed5-46d3-bf49-15f22661c162/air-force-1-07-premium-womens-shoes-qQJZBs.png"
        ],
        "colors": [
            {
                "name": "LightSalmon",
                "hexValue": "#FFA07A"
            }
        ],
        "sizes": [
            "7"
        ],
        "featuringFrom": "02/08/2022",
        "featuringTo": "25/08/2022"
    },
    {
        "id": "924c02a4-db37-4b93-a28d-14a7c761369f",
        "name": "Air Jordan 1 Elevate Low SE",
        "price": 1400,
        "stock": 0,
        "description": "Unisex Shoes",
        "categories": [
            "Men",
            "Women",
            "Unisex",
            "Shoes",
            "Jordan"
        ],
        "pictures": [
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0dbd3627-7dc9-44ee-92f4-c2907d8f4d13/air-jordan-1-elevate-low-se-womens-shoes-1W20F7.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/8e01e221-8c4e-4964-97aa-828474f5fe3f/air-jordan-1-elevate-low-se-womens-shoes-1W20F7.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f7fb8ebb-6302-425f-b819-ea30939b3bdf/air-jordan-1-elevate-low-se-womens-shoes-1W20F7.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/3a5ff95f-bb54-4ad0-afb8-f8cde81b2878/air-jordan-1-elevate-low-se-womens-shoes-1W20F7.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/023653bb-f8ae-4779-98c2-2596dfa48e40/air-jordan-1-elevate-low-se-womens-shoes-1W20F7.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4f3310ff-7b19-4603-80cf-ce95c70f2f5b/air-jordan-1-elevate-low-se-womens-shoes-1W20F7.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1b86ceb8-0158-4eec-8f4a-415394c79669/air-jordan-1-elevate-low-se-womens-shoes-1W20F7.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/3da1a64b-53c3-442e-8b3d-0ab2b5ecf597/air-jordan-1-elevate-low-se-womens-shoes-1W20F7.png",
            "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d9c3e95e-1723-4002-9541-734c0b547267/air-jordan-1-elevate-low-se-womens-shoes-1W20F7.png"
        ],
        "colors": [
            {
                "name": "University Blue",
                "hexValue": "#3c91d0"
            }
        ],
        "sizes": [
            "5",
            "5.5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "10.5",
            "11",
            "11.5",
            "12"
        ]
    }
]

export const StoreContext = React.createContext(null);

export const Owner = (props) => {
    const [isShow, setIsShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const store = {
        show: { isShow, setIsShow },
        edit: { isEdit, setIsEdit },
        editInfo: { dataEdit, setDataEdit },
    }
    const [addProductMutation, { dataMutation, loadingMutation, errorMutation }] = useMutationAddProduct();
    const [removeProductMutation, resultRemove] = useMutationRemoveProduct();

    const { loading, error, data, refetch } = useQueryGetProducts();

    const openEdit = (item) => {
        setDataEdit({ ...item });
        setIsShow(true);
        setIsEdit(true);
    }

    const removeProduct = (id) => {
        removeProductMutation({
            variables: {
                "removeProductId": id
            }
        })
        refetch();
    }

    useEffect(() => {
        if (data && data.products.length === 0) {
            console.log(data.products.length)
            defaultData.forEach((value) => {
                addProductMutation({
                    variables: {
                        "item": {
                            "name": value.name,
                            "price": value.price,
                            "stock": value.stock,
                            "categories": [...value.categories],
                            "pictures": [...value.pictures],
                            "colors": [...value.colors],
                            "sizes": [...value.sizes],
                            "featuringFrom": value.featuringFrom,
                            "featuringTo": value.featuringTo
                        }
                    }
                })
            })
        }
    }, [data])
    return <div style={{ position: 'relative' }}>
        <Header link={'Owner'}></Header>
        <div style={{ position: 'absolute', top: '100px' }}>
            <div id="owner-flow" className="owner-flow" style={{ width: '100vw', position: 'relative' }}>
                <StoreContext.Provider value={store}>
                    <ProductInputForm className="owner-input-form" isShow={isShow}></ProductInputForm>
                </StoreContext.Provider>
                <div className="owner-container">
                    <div className="header">
                        <div className="table-name">PRODUCT LIST</div>
                        <button className="btn" onClick={() => {setIsShow(true); setIsEdit(false)}}>Add product</button>
                    </div>
                    <div className="main">
                        <div className="owner-title">
                            <div className="title-name">Name</div>
                            <div className="title-price">Price</div>
                            <div className="title-color">Color</div>
                            <div className="title-size">Size</div>
                            <div className="title-edit">Edit</div>
                            <div className="title-delete">Delete</div>
                        </div>
                        {data?.products.map((value) => (
                            <div className="owner-item" key={value.id}>
                                <div className="item-name">{value.name}</div>
                                <div className="item-price">{value.price}</div>
                                <div className="item-color">{
                                    value.colors.map((value2, index) => {
                                        if (index !== value.colors.length - 1) {
                                            return value2.name + ', '
                                        }
                                        else
                                            return value2.name
                                    })
                                }</div>
                                <div className="item-size">{value.sizes.join(', ')}</div>
                                <div className="item-edit" onClick={() => openEdit(value)}>
                                    <div className="bi bi-pencil"></div>
                                </div>
                                <div className="item-delete">
                                    <div className="bi bi-trash" onClick={() => removeProduct(value.id)}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    </div>
}
