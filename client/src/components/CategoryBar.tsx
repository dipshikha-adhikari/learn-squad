import { categories } from "../assets/data";
import Layout from "./Layout";
import useStore from "../store/store";

const CategoryBar = () => {
 const setCategory  = useStore(state => state.setCategory)
const category = useStore(state =>state.query.category)

  return (
    <div className="fixed pb-1 left-0 top-[12vh]  xs:h-[12vh] bg-white z-40 w-full">
      <Layout>
        {" "}
        <div className="flex  gap-2 xs:gap-10  category_bar lg:justify-center   w-full  overflow-x-scroll ">
          {categories.map((c) => {
            let Icon = c.icon;
            return (
              <div
                key={c.label}
                className={`${category === c.label && 'bg-sky-200'} grid box gap-2 cursor-pointer border-sm rounded-lg border-light p-2`}
                onClick={() => setCategory(c.label)}
              >
                <i>
                  <Icon fontSize={20} />
                </i>
                <label htmlFor="" className="cursor-pointer">
                  {c.label}
                </label>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
};

export default CategoryBar
