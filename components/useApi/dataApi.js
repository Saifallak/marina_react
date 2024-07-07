import Cookies from "js-cookie";

export const getBlogs = async () => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/data/blogs?page=1&featured=1",
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
  export const getBlogsType = async (type) => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/data/blogs?type=2&page=1",
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
  export const getAllBlogs = async () => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/data/blogs?type=1",
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
  export const getBlogsDetails = async (id) => { 
    try {
      const res = await fetch(
        `https://admin.marina.com.eg/api/data/blog_details?blog_id=${id}`,
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
  export const getCatalogWith = async () => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/data/catalog_types?with_catalogs=1",
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
  export const getCatalogDetails = async (id) => { 
    try {
      const res = await fetch(
        `https://admin.marina.com.eg/api/data/catalogs/details?id=${id}`,
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
  export const getCatalogType = async (id) => { 
    try {
      const res = await fetch(
        `https://admin.marina.com.eg/api/data/catalogs?catalog_type_id=${id}`,
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
  export const getCurrentCatalouge = async () => { 
    try {
      const res = await fetch(
        "https://admin.marina.com.eg/api/data/catalog_types?with_catalogs=1",
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
  
export const getFAQ = async () => { 
  try {
    const res = await fetch(
      "https://admin.marina.com.eg/api/data/faqs",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in Add New Category (service) =>", error);
  }
};
export const getDirectors = async () => { 
  try {
    const res = await fetch(
      `https://admin.marina.com.eg/api/data/directors?grouped=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in Add New Category (service) =>", error);
  }
};
export const getOneDirectors = async (id) => { 
  try {
    const res = await fetch(
      `https://admin.marina.com.eg/api/data/directors/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in Add New Category (service) =>", error);
  }
};
export const getYears = async () => { 
  try {
    const res = await fetch(
      `https://admin.marina.com.eg/api/data/directors/years`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in Add New Category (service) =>", error);
  }
};