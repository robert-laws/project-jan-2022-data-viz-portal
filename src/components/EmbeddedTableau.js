import { useEffect } from 'react';

export const EmbeddedTableau = () => {
  useEffect(() => {
    if (document.getElementById('viz1641661290032')) {
      var divElement = document.getElementById('viz1641661290032');
      var vizElement = divElement.getElementsByTagName('object')[0];
      vizElement.style.width = '100%';
      vizElement.style.height = divElement.offsetWidth * 0.75 + 'px';
      var scriptElement = document.createElement('script');
      scriptElement.src =
        'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode.insertBefore(scriptElement, vizElement);
    }
  }, []);

  return (
    <div>
      <h2>Embedded Tableau</h2>
      <p>
        The visualizations below are{' '}
        <a href='https://public.tableau.com/app/profile/robert.laws3971/viz/north-america-population/NorthAmerica-Population2000-2022?publish=yes'>
          {' '}
          embedded from Tableau Public
        </a>
        . This can be done by using{' '}
        <a href='https://public.tableau.com/en-us/s/'>Tableau Public</a>,
        creating visualizations, and saving to Tableau Public.
      </p>
      <div>
        <div
          className='tableauPlaceholder'
          id='viz1641661290032'
          style={{ position: 'relative' }}
        >
          <object className='tableauViz' style={{ display: 'none' }}>
            <param
              name='host_url'
              value='https%3A%2F%2Fpublic.tableau.com%2F'
            />
            <param name='embed_code_version' value='3' />
            <param name='site_root' value='' />
            <param
              name='name'
              value='north-america-population&#47;NorthAmerica-Population2000-2022'
            />
            <param name='tabs' value='no' />
            <param name='toolbar' value='yes' />
            <param name='animate_transition' value='yes' />
            <param name='display_static_image' value='yes' />
            <param name='display_spinner' value='yes' />
            <param name='display_overlay' value='yes' />
            <param name='display_count' value='yes' />
            <param name='language' value='en-US' />
            <param name='filter' value='publish=yes' />
          </object>
        </div>
      </div>
    </div>
  );
};
