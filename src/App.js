import { useState } from 'react';
import Saa from './components/Saa';
import Valikko from './components/Valikko';

function App() {

  const [paikkakunta, setPaikkakunta] = useState("mikkeli");

  return (

    <div>
          <Valikko setPaikkakunta={setPaikkakunta}/>
          <Saa paikkakunta={paikkakunta}/>
    </div>
    
  );

}

export default App;
