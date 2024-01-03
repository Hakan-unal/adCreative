import { Row, Select, Checkbox, Col, Image } from "antd";
import "./index.css";
import { getCharacter } from "rickmortyapi";
import { useEffect, useState } from "react";

export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character extends ResourceBase {
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export interface ApiResponse<T> {
  /** The HTTP status code from the API response */
  status: number;
  /** The HTTP status message from the API response */
  statusMessage: string;
  /** The response that was provided by the API */
  data: T;
}

const App = () => {
  const [data, setData] = useState<ApiResponse<Character[]> | any>([]);
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleChange = (value: string | string[]) => {
    setSelectedValues(value);
  };

  const handleGetData = async () => {
    const response = await getCharacter([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);

    const tempArr = response.data.map((obj, index) => ({
      value: JSON.stringify(obj),
      label: obj.name,
    }));

    setData(tempArr);
    setIsLoading(false)

  };


  useEffect(() => {
    setIsLoading(true)

    setTimeout(()=>{
      handleGetData();

    },1500)

  }, []);

  return (
    <Row justify={"center"}>

      <Select
        loading={isLoading}
        mode="multiple"
        size="middle"
        onChange={handleChange}
        style={{ width: 300 }}
        options={data}
        showSearch={true}
        filterOption={(input, option) => {
          return option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
        optionRender={(obj) => {
          const tempData = obj.data.value;
          const data = JSON.parse(obj.data.value);
          const { image, name, episode } = data;
          return (
            <Row>
              <Col span={2}>
                <Checkbox
                  style={{ cursor: "pointer" }}
                  disabled
                  checked={selectedValues.includes(tempData)}
                />
              </Col>
              <Col span={4} offset={1}>
                <Image
                  preview={false}
                  style={{ borderRadius: 5 }}
                  src={image}
                />
              </Col>
              <Col span={2} offset={1}>
                {name}
                <br />
                <small>{episode.length} Episodes</small>
              </Col>
              <Col span={2} offset={1}></Col>
            </Row>
          );
        }}
      />
    </Row>
  );
};

export default App;
