import { Htag } from "@/components";
import { withLayout } from "@/layout/Layout";
import React from 'react';

function Error404(): JSX.Element {
    return (
      <>
        <Htag tag='h1'>Ошибка 404</Htag>
      </>
    );
}

export default withLayout(Error404);