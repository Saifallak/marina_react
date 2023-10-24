
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