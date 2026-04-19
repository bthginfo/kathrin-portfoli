import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { projects } from '../data/projects';
import Footer from '../components/Footer';
import MasonryGallery from '../components/MasonryGallery';
import { useEffect } from 'react';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const project = projects[language].find((p) => p.id === id);
  const nextProject = project?.nextProject
    ? projects[language].find((p) => p.id === project.nextProject)
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="project-detail" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h2>Project not found</h2>
        <Link to="/" style={{ color: 'var(--color-accent)', marginTop: '1rem', display: 'inline-block' }}>
          {t.projects.backToProjects}
        </Link>
      </div>
    );
  }

  // Spezialfall: Fotoportfolio-Projekt mit Masonry-Gallery und Tabs
  if (project.id === 'photo-portfolio') {
    // Die Gallery enthält alle Bilder, wir ordnen sie Kategorien zu
    const categories = ['Nature', 'Animals', 'Street Photography'];
    // Die ersten 10 = Nature, nächsten 10 = Animals, letzten 10 = Street
    const galleryWithCategory = project.gallery.map((img, i) => {
      let category = '';
      if (i < 10) category = 'Nature';
      else if (i < 20) category = 'Animals';
      else category = 'Street Photography';
      return { ...img, category };
    });
    return (
      <div className="project-detail">
        <div className="project-detail__header">
          <Link to="/" className="project-detail__back">
            {t.projects.backToProjects}
          </Link>
          <p className="project-detail__category">{project.category}</p>
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__overview">{project.overview}</p>
        </div>
        <div className="project-detail__body">
          <div className="project-detail__hero-img">
            {project.thumbnail ? (
              <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span>{project.title.split('—')[0].trim()}</span>
            )}
          </div>
          <div className="project-detail__meta">
            <div className="project-detail__meta-item">
              <h4>{t.projects.role}</h4>
              <p>{project.role}</p>
            </div>
            <div className="project-detail__meta-item">
              <h4>{t.projects.duration}</h4>
              <p>{project.duration}</p>
            </div>
            <div className="project-detail__meta-item">
              <h4>Client</h4>
              <p>{project.client}</p>
            </div>
            <div className="project-detail__meta-item">
              <h4>{t.projects.tools}</h4>
              <p>{project.tools.join(', ')}</p>
            </div>
          </div>
          <div className="project-detail__section">
            <h3>Gallery</h3>
            <MasonryGallery images={galleryWithCategory} categories={categories} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  // Standard-Layout für alle anderen Projekte
  return (
    <div className="project-detail">
      {/* ...existing code... */}
    </div>
  );
}
