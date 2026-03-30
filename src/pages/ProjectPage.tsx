import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { projects } from '../data/projects';
import Footer from '../components/Footer';
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

  return (
    <div className="project-detail">
      {/* Header */}
      <div className="project-detail__header">
        <Link to="/" className="project-detail__back">
          {t.projects.backToProjects}
        </Link>
        <p className="project-detail__category">{project.category}</p>
        <h1 className="project-detail__title">{project.title}</h1>
        <p className="project-detail__overview">{project.overview}</p>
      </div>

      <div className="project-detail__body">
        {/* Hero Image */}
        <div className="project-detail__hero-img">
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span>{project.title.split('—')[0].trim()}</span>
          )}
        </div>

        {/* Meta Grid */}
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
            <h4>{language === 'en' ? 'Team' : 'Team'}</h4>
            <p>{project.team}</p>
          </div>
          <div className="project-detail__meta-item">
            <h4>{language === 'en' ? 'Client' : 'Kunde'}</h4>
            <p>{project.client}</p>
          </div>
          <div className="project-detail__meta-item">
            <h4>{t.projects.tools}</h4>
            <p>{project.tools.join(', ')}</p>
          </div>
        </div>

        {/* Challenge */}
        <div className="project-detail__section">
          <h3>{t.projects.challenge}</h3>
          <p>{project.challenge}</p>
          <ul className="project-detail__detail-list">
            {project.challengeDetails.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Research Insights */}
        <div className="project-detail__section">
          <h3>{language === 'en' ? 'Research & Insights' : 'Forschung & Erkenntnisse'}</h3>
          <div className="project-detail__insights-grid">
            {project.researchInsights.map((insight, i) => (
              <div key={i} className="project-detail__insight-card">
                <span className="project-detail__insight-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Image 1 */}
        {project.gallery[0] && (
          <div className="project-detail__gallery-single">
            <img src={project.gallery[0].src} alt={project.gallery[0].caption} />
            <p className="project-detail__gallery-caption">{project.gallery[0].caption}</p>
          </div>
        )}

        {/* Design Process */}
        <div className="project-detail__section">
          <h3>{language === 'en' ? 'Design Process' : 'Designprozess'}</h3>
          <div className="project-detail__process">
            {project.process.map((step, i) => (
              <div key={i} className="project-detail__process-step">
                <div className="project-detail__process-icon">{step.icon}</div>
                <div className="project-detail__process-line" />
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solution */}
        <div className="project-detail__section">
          <h3>{t.projects.solution}</h3>
          <p>{project.solution}</p>
          <ul className="project-detail__detail-list">
            {project.solutionDetails.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Gallery Image 2 */}
        {project.gallery[1] && (
          <div className="project-detail__gallery-single">
            <img src={project.gallery[1].src} alt={project.gallery[1].caption} />
            <p className="project-detail__gallery-caption">{project.gallery[1].caption}</p>
          </div>
        )}

        {/* Key Features */}
        <div className="project-detail__section">
          <h3>{language === 'en' ? 'Key Features' : 'Kernfunktionen'}</h3>
          <div className="project-detail__features-grid">
            {project.keyFeatures.map((feature, i) => (
              <div key={i} className="project-detail__feature-card">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="project-detail__section project-detail__results-section">
          <h3>{t.projects.results}</h3>
          <div className="project-detail__results-grid">
            {project.results.map((result, i) => (
              <div key={i} className="project-detail__result-card">
                <span className="project-detail__result-icon">✦</span>
                <p>{result}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Image 3 */}
        {project.gallery[2] && (
          <div className="project-detail__gallery-single">
            <img src={project.gallery[2].src} alt={project.gallery[2].caption} />
            <p className="project-detail__gallery-caption">{project.gallery[2].caption}</p>
          </div>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <div className="project-detail__testimonial">
            <blockquote>"{project.testimonial.quote}"</blockquote>
            <div className="project-detail__testimonial-author">
              <strong>{project.testimonial.author}</strong>
              <span>{project.testimonial.role}</span>
            </div>
          </div>
        )}

        {/* Learnings */}
        <div className="project-detail__section">
          <h3>{language === 'en' ? 'Key Learnings' : 'Wichtige Erkenntnisse'}</h3>
          <div className="project-detail__learnings">
            {project.learnings.map((learning, i) => (
              <div key={i} className="project-detail__learning-card">
                <span className="project-detail__learning-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{learning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Project */}
        {nextProject && (
          <Link to={`/project/${nextProject.id}`} className="project-detail__next-project">
            <span className="project-detail__next-label">
              {language === 'en' ? 'Next Project' : 'Nächstes Projekt'}
            </span>
            <span className="project-detail__next-title">{nextProject.title}</span>
            <span className="project-detail__next-arrow">→</span>
          </Link>
        )}
      </div>

      <Footer />
    </div>
  );
}
