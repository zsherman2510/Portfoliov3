import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projects } from "../data/projects";

const ScreenshotGrid = ({ title, items = [] }) => {
  if (!items.length) return null;

  return (
    <div className="brutal-card p-6 md:p-8">
      <h3 className="brutal-h3 mb-5">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item, idx) => {
          const hasImage = Boolean(item?.src);

          return (
            <div key={`${title}-${idx}`} className="border-4 border-brutal-black bg-white">
              {hasImage ? (
                <img
                  src={item.src}
                  alt={`${item.label || title} screenshot`}
                  className="w-full max-h-[520px] object-contain border-b-4 border-brutal-black bg-brutal-cream"
                />
              ) : (
                <div className="h-56 border-b-4 border-brutal-black bg-brutal-cream flex items-center justify-center text-center px-4">
                  <div>
                    <p className="font-heading text-lg uppercase">upload screenshot</p>
                    {item?.expectedFile && (
                      <p className="brutal-body mt-2 break-all">{item.expectedFile}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="p-3">
                <p className="font-heading text-sm uppercase">{item?.label || `shot ${idx + 1}`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="brutal-section bg-brutal-offwhite">
        <div className="brutal-container">
          <h2 className="brutal-h2 mb-4">project not found</h2>
          <p className="brutal-body-lg mb-8">
            i could not find that project. try heading back to the projects list.
          </p>
          <button
            className="brutal-btn-primary brutal-btn-lg"
            onClick={() => navigate("/#projects")}
          >
            back to projects
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="brutal-section bg-brutal-offwhite">
      <div className="brutal-container">
        <div className="flex items-start justify-between gap-8 flex-wrap mb-12 md:mb-16">
          <div>
            <div className="brutal-badge inline-block mb-6">project {project.number}</div>
            <h2 className="brutal-h2 mb-3">{project.title}</h2>
            <p className="brutal-body-lg max-w-2xl">{project.tagline}</p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button className="brutal-btn-secondary" onClick={() => navigate("/#projects")}>
              back
            </button>

            {project.comingSoon ? (
              <div className="brutal-btn-outline opacity-70 cursor-not-allowed">coming soon</div>
            ) : (
              !project.comingSoon &&
              project.projectUrl && (
                <a
                  className="brutal-btn-primary"
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  visit
                </a>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-10">
            <div className="brutal-card-yellow p-1">
              <img
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                className="w-full h-auto object-cover border-4 border-brutal-black"
              />
            </div>

            <ScreenshotGrid title="web screenshots" items={project?.media?.web || []} />
            <ScreenshotGrid title="mobile screenshots" items={project?.media?.mobile || []} />

            <div className="brutal-card p-6 md:p-8">
              <h3 className="brutal-h3 mb-4">what it does</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.whatItDoes.map((item, idx) => (
                  <div key={idx} className="border-t-4 border-brutal-black pt-4">
                    <h4 className="font-heading text-lg font-bold uppercase mb-2">{item.title}</h4>
                    <p className="brutal-body">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-28">
            <div className="brutal-card p-6">
              <h3 className="brutal-h4 uppercase mb-4">overview</h3>
              <p className="brutal-body">{project.description}</p>
            </div>

            <div className="brutal-card-blue p-6">
              <h3 className="brutal-h4 uppercase mb-4">stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tag, idx) => (
                  <span
                    key={idx}
                    className="brutal-tag-outline bg-brutal-blue border-white text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.caseStudy && (
              <div className="brutal-card p-6">
                <h3 className="brutal-h4 uppercase mb-4">case study</h3>
                <div className="space-y-3 brutal-body">
                  {project.caseStudy.role && (
                    <p>
                      <span className="font-heading font-bold uppercase">role</span>: {project.caseStudy.role}
                    </p>
                  )}
                  {project.caseStudy.status && (
                    <p>
                      <span className="font-heading font-bold uppercase">status</span>: {project.caseStudy.status}
                    </p>
                  )}
                  {project.caseStudy.timeline && (
                    <p>
                      <span className="font-heading font-bold uppercase">timeline</span>: {project.caseStudy.timeline}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="brutal-card p-6">
              <h3 className="brutal-h4 uppercase mb-4">highlights</h3>
              <ul className="list-disc pl-5 space-y-2 brutal-body">
                {project.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {project.caseStudy && (
          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {project.caseStudy.context && (
              <div className="brutal-card p-6 md:p-8 lg:col-span-2">
                <h3 className="brutal-h3 mb-4">context</h3>
                <p className="brutal-body">{project.caseStudy.context}</p>
              </div>
            )}

            {project.caseStudy.problem && (
              <div className="brutal-card p-6 md:p-8">
                <h3 className="brutal-h3 mb-4">problem</h3>
                <p className="brutal-body">{project.caseStudy.problem}</p>
              </div>
            )}

            {project.caseStudy.solution && (
              <div className="brutal-card p-6 md:p-8">
                <h3 className="brutal-h3 mb-4">solution</h3>
                <p className="brutal-body">{project.caseStudy.solution}</p>
              </div>
            )}

            {project.caseStudy.goals && (
              <div className="brutal-card p-6 md:p-8">
                <h3 className="brutal-h3 mb-4">goals</h3>
                <ul className="list-disc pl-5 space-y-2 brutal-body">
                  {project.caseStudy.goals.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy.nonGoals && (
              <div className="brutal-card p-6 md:p-8">
                <h3 className="brutal-h3 mb-4">non goals</h3>
                <ul className="list-disc pl-5 space-y-2 brutal-body">
                  {project.caseStudy.nonGoals.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy.constraints && (
              <div className="brutal-card p-6 md:p-8 lg:col-span-2">
                <h3 className="brutal-h3 mb-4">constraints</h3>
                <ul className="list-disc pl-5 space-y-2 brutal-body">
                  {project.caseStudy.constraints.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy.decisions && (
              <div className="brutal-card p-6 md:p-8 lg:col-span-2">
                <h3 className="brutal-h3 mb-6">decisions and tradeoffs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.caseStudy.decisions.map((d, idx) => (
                    <div key={idx} className="border-4 border-brutal-black p-4 bg-brutal-offwhite">
                      <h4 className="font-heading text-lg font-bold uppercase mb-3">{d.title}</h4>
                      <p className="brutal-body mb-2"><span className="font-heading font-bold uppercase">why</span>: {d.why}</p>
                      <p className="brutal-body"><span className="font-heading font-bold uppercase">tradeoff</span>: {d.tradeoff}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.caseStudy.architecture && (
              <div className="brutal-card p-6 md:p-8 lg:col-span-2">
                <h3 className="brutal-h3 mb-4">architecture</h3>
                <ul className="list-disc pl-5 space-y-2 brutal-body">
                  {project.caseStudy.architecture.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy.responsibilities && (
              <div className="brutal-card p-6 md:p-8">
                <h3 className="brutal-h3 mb-4">what i owned</h3>
                <ul className="list-disc pl-5 space-y-2 brutal-body">
                  {project.caseStudy.responsibilities.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy.outcomes && (
              <div className="brutal-card p-6 md:p-8">
                <h3 className="brutal-h3 mb-4">outcomes</h3>
                <ul className="list-disc pl-5 space-y-2 brutal-body">
                  {project.caseStudy.outcomes.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy.next && (
              <div className="brutal-card p-6 md:p-8 lg:col-span-2">
                <h3 className="brutal-h3 mb-4">next</h3>
                <ul className="list-disc pl-5 space-y-2 brutal-body">
                  {project.caseStudy.next.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;
