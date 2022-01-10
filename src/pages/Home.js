import ImageOneJPG from '../assets/images/data-viz-1.jpg';
import ImageOneWEBP from '../assets/images/data-viz-1.webp';
import ImageTwoJPG from '../assets/images/data-viz-2.jpg';
import ImageTwoWEBP from '../assets/images/data-viz-2.webp';

export const Home = () => {
  return (
    <main className='section-app-content'>
      <div className='app-content'>
        <div className='home-content'>
          <div>
            <h3>What is Data Visualization and What can I do with it?</h3>
            <p>
              Data visualization is the process of transforming data into a
              visual representation. Using this transformation, it's possible to
              gain insights into the data and to make attempt to discover
              meaning within the data.
            </p>
            <picture>
              <source srcSet={ImageOneWEBP} type='image/webp' />
              <source srcSet={ImageOneJPG} type='image/jpeg' />
              <img src={ImageOneJPG} alt='Data Visualization' />
            </picture>
          </div>
          <div>
            <h3>Is Data Visualization just about lines, bars, and colors?</h3>
            <p>
              Not at all, in fact, data visualization is a key tool within the
              field of data analytics. It's a vital part of the process of
              discovering patterns and relationships with a dataset. Often
              datasets are thousands and millions of rows long, making it
              virtually impossible to gain any understanding of the data in its
              raw form. However, data visualization help to cut through this
              complexity and provide a means to gain insight into the data.
            </p>
            <picture>
              <source srcSet={ImageTwoWEBP} type='image/webp' />
              <source srcSet={ImageTwoJPG} type='image/jpeg' />
              <img src={ImageTwoJPG} alt='Data Visualization' />
            </picture>
          </div>
          <div>
            <h3>
              How will this website help me to learn more about Data
              Visualization?
            </h3>
            <p>
              By signing up for an account, you will be able to access polls,
              quizzes, and a dashboard to view your progress with the related
              course materials. The website also contains a large number of
              helpful resources including links to useful resources and
              datasets, a full playlist of instructional videos, and examples of
              how to embed tableau visualization into a website.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
