import { Fragment } from "react";
import Head from "next/head";

const HomePage = () => {

  return (
    <Fragment>
      <Head>
        <title>See You Letter</title>
        <meta
          name="description"
          content="로그인 페이지입니다."
        />
      </Head>
    </Fragment>
  );
};

export const getStaticProps = async () => {

}

export default HomePage;
