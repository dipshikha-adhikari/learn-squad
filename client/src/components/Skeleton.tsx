
const Skeleton = () => {
 

  return (
    <div className="grid gap-8 ">
       <div className="h-60 w-full bg-gray-200 rounded-md"></div>
       <div className="grid gap-6">
        <p className="w-80 h-5 bg-gray-200"></p>
        <p className="w-60 h-5 bg-gray-200"></p>
        <p className="w-40 h-5 bg-gray-200"></p>
       </div>
    </div>
  );
};

export default Skeleton