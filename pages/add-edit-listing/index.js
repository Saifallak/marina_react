
import {
  Group,
  NumberInput,
  Radio,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import styles from "@/styles/admin.module.scss";
import img from "@/public/images/navbar/blue.svg";
import del from "@/public/images/delete.svg";
import PageComponent from "@/components/PageComponent";

function index() {
  const [selectedHeader , setSelectedHeader ] = useState(null);
  const [selectedListing , setSelectedListing ] = useState(null);
  const [selectedLogo , setSelectedLogo ] = useState(null);

  const handleHeaderInputChange = (e) => {
    console.log("111");

    console.log(e);
    setSelectedHeader(e.target.files[0]);
  };
  const handleListingInputChange = (e) => {
    console.log(e);

    setSelectedListing(e.target.files[0]);
  };
  const handleLogoInputChange = (e) => {
    console.log(e);

    setSelectedLogo(e.target.files[0]);
  };
  return (
    <PageComponent
      styles={styles}
      title="ADD / EDIT LISTING"
      hero={img.src}
      over={"false"}
    >
      <div className=" container  mx-auto ">
        <div className={styles.admin}>
          <div className={styles.edit_list}>
            <form>
              <div className={styles.part1}>
                <div className={styles.parts}>
                  <div className={styles.part}>
                    <TextInput placeholder="Title" />
                    <TextInput placeholder="العنوان" />
                  </div>
                  <TextInput placeholder="Category" />
                </div>

                <Textarea placeholder="Info" />

                <Textarea placeholder="التفاصيل" />

                <div className={styles.phone_google}>
                  <NumberInput placeholder="Phone Number" variant="unstyled" />
                  <TextInput placeholder="Google Maps Link" />
                </div>
              </div>
              <div className={styles.part2}>
                <div className={styles.allFile}>
                <div className={styles.file}>
                  {!selectedHeader && (
                    <>
                      <p>Header Image</p>
                      <label
                        htmlFor="file-input1"
                        className={styles.file_input_label}
                      >
                        UPLOAD
                      </label>
                      <input
                        type="file"
                        id="file-input1"
                        className={styles.file_input}
                        onChange={handleHeaderInputChange}
                      />{" "}
                    </>
                  )}

                  {selectedHeader && (
                    <div className="image-preview">
                      <button onClick={() => setSelectedHeader("")}>x</button>
                      <img src={URL.createObjectURL(selectedHeader)} />
                    </div>
                  )}
                </div>
                <div className={styles.file}>
                  {!selectedListing && (
                    <>
                      <p>Listing Images</p>
                      <label
                        htmlFor="file-input2"
                        className={styles.file_input_label}
                      >
                        UPLOAD
                      </label>
                      <input
                        type="file"
                        id="file-input2"
                        className={styles.file_input}
                        onChange={handleListingInputChange}
                      />{" "}
                    </>
                  )}

                  {selectedListing && (
                    <div className="image-preview">
                      <button onClick={() => setSelectedListing("")}>x</button>
                      <img src={URL.createObjectURL(selectedListing)} />
                    </div>
                  )}
                </div>
                <div className={styles.file}>
                  {!selectedLogo && (
                    <>
                      <p>Logo Image</p>
                      <label
                        htmlFor="file-input3"
                        className={styles.file_input_label}
                      >
                        UPLOAD
                      </label>
                      <input
                        type="file"
                        id="file-input3"
                        className={styles.file_input}
                        onChange={handleLogoInputChange}
                      />{" "}
                    </>
                  )}

                  {selectedLogo && (
                    <div className="image-preview">
                      <button onClick={() => setSelectedLogo("")}>x</button>
                      <img src={URL.createObjectURL(selectedLogo)} />
                    </div>
                  )}
                </div>

                </div>
                
                <Radio.Group name="favoriteFramework" withAsterisk>
                  <Group
                    mt="xs"
                    className={styles.radios}
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                    variant="vertical"
                  >
                    <Radio value="go" label="Feature on Where To Go" />
                    <Radio value="home" label="Feature on Home Page" />
                    <Radio value="top" label="Feature on Top 5" />
                  </Group>
                </Radio.Group>

                <div className={styles.btn}>
                  <button type="submit">SUBMIT </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                   
                    <img src={del.src} alt="delet" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}

export default index;
