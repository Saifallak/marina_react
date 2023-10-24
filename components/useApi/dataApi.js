import Cookies from "js-cookie";

export const getBlogs = async () => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/data/blogs?id=2",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "ar",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error in Add New Category (service) =>", error);
    }
  };
  
export const getCatalog = async () => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/data/catalog_types",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "ar",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error in Add New Category (service) =>", error);
    }
  };
  export const getPdf= async () => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/data/pdfs",
        {
          method: "GET",
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error in Add New Category (service) =>", error);
    }
  };

  export const getServices = async () => { 
    try {
      const res = await fetch(
        `https://admin.marina.com.eg/api/data/services`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error in Add New Category (service) =>", error);
    }
  };
  export const getUserDate = async () => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/auth/requests",
        {
          method: "GET",
          headers : {
            Authorization: `Bearer ${Cookies.get('access_token')} `,
            "Content-Type": "application/json",
            Accept: "application/json",
            //"Accept-Language": `${locale}`,
          }
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error in Add New Category (service) =>", error);
    }
  };
  export const getUserAuth = async () => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/auth/user",
        {
          method: "GET",
          headers : {
            Authorization: `Bearer ${Cookies.get('access_token')} `,
            "Content-Type": "application/json",
            Accept: "application/json",
            //"Accept-Language": `${locale}`,
          }
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error in Add New Category (service) =>", error);
    }
  };