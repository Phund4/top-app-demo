import { Htag } from "@/components";
import { withLayout } from "@/layout/Layout";
import React from 'react';

function Error500(): JSX.Element {
    return (
      <>
        <Htag tag='h1'>Ошибка 500</Htag>
      </>
    );
}

export default withLayout(Error500);