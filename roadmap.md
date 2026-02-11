# Festival Website Development Roadmap

**Strategic Approach: MVP-First with Gradual React Integration**

---

## Executive Summary

This roadmap proposes a **phased approach** that:

- Delivers the countdown page on time (this week) using vanilla JS
- Protects the team's learning curve by aligning React adoption with structured course content
- Identifies specific components where React adds genuine value
- Maintains project velocity whilst building proper React foundations

**Key Principle:** Use the right tool at the right time, prioritising delivery over technology.

---

## Phase 1: Foundation & MVP (Week 1-2)

**Technology: Vanilla JS + Vite**  
**Deadline: This Week (Countdown Page)**

### Deliverables

- ✅ Countdown timer page (live deployment)
- ✅ Redirect logic when timer reaches zero
- ✅ Mobile-first responsive design
- ✅ Project structure with modular CSS

### Rationale

- **Team readiness:** No React experience yet, structured learning begins next week
- **Risk mitigation:** Vanilla JS ensures we hit our first deadline with confidence
- **Foundation building:** Establishes git workflow, deployment pipeline, and collaboration patterns

### Technical Assets Created

- Fragment-based templating system (`.fragment.html` convention)
- CSS variable architecture (colours, typography, spacing)
- Working Vite build pipeline
- Mobile-optimised performance baseline

**Status: Non-negotiable for deadline protection**

---

## Phase 2: Event Page Development (Week 3-4)

**Technology: Vanilla JS (Primary) with React Evaluation**  
**Milestone: After React Course Module**

### Deliverables

- Venue map integration
- Attendance tracking (localStorage feature)
- Event schedule/timetable
- Navigation between pages

### Strategic Decision Point

**After completing the React course module, evaluate:**

#### Candidates for React Refactoring

1. **Venue Map Component** (if interactive)
   - _Why React helps:_ Complex state (zoom levels, marker selection, filter toggles)
   - _Vanilla JS challenge:_ Manual DOM updates across multiple interactions
   - _React benefit:_ Declarative rendering of map state

2. **Event Schedule/Filter System**
   - _Why React helps:_ Real-time filtering, sorting, search across event data
   - _Vanilla JS challenge:_ Coordinating filter state with DOM updates
   - _React benefit:_ Component reusability for event cards

#### Stay Vanilla JS

- **Attendance tracking:** localStorage wrapper is simpler without React overhead
- **Static content sections:** No state management needed
- **Navigation:** Fragment system already works well

### Implementation Approach

If React components are approved:

- **Isolated integration:** React islands within Vite app (not full rewrite)
- **Preserve existing code:** Vanilla JS pages remain untouched
- **Team division:** Assign React components to students who've grasped course concepts

---

## Phase 3: Results Page (Week 5-6)

**Technology: Hybrid Approach Based on Phase 2 Learnings**

### Deliverables

- Voting interface
- Real-time results display (if applicable)
- Prize/winner announcements

### React Consideration: Voting Interface

**Why this might justify React:**

- **State complexity:** Vote submissions, validation, immediate UI feedback
- **Conditional rendering:** Different states (not voted, voted, results revealed)
- **Form handling:** React's controlled components simplify validation

**Vanilla JS Alternative:**

- Form validation with custom event listeners
- Template literals for UI state updates
- Works fine for simple vote-and-display flow

### Decision Criteria

**Choose React if:**

- Team has successfully completed React course assignments
- Phase 2 React components proved valuable (not just theoretical)
- Voting system requires multi-step flow or complex state

**Stay vanilla if:**

- Team is still consolidating React knowledge
- Simple one-time vote submission (no complex interactions)
- Phase 2 showed vanilla JS was sufficient

---

## Technical Integration Strategy

### If React Components Are Introduced

#### Architecture

```
src/
├── pages/
│   ├── countdown/          # Vanilla JS (Phase 1)
│   ├── event/              # Hybrid (Phase 2)
│   │   ├── map.jsx         # React component
│   │   ├── schedule.jsx    # React component
│   │   └── tracking.js     # Vanilla JS (localStorage)
│   └── results/            # Hybrid (Phase 3)
├── components/             # Shared React components
└── fragments/              # Vanilla HTML fragments
```

#### Vite Configuration

- Use `@vitejs/plugin-react` for `.jsx` files
- Maintain separate entry points (no forced migration)
- Keep build output lean (tree-shaking for unused React code)

#### CSS Strategy

- **Preserve existing CSS architecture** (variables, modular files)
- React components use same CSS custom properties
- No CSS-in-JS (maintains consistency, reduces bundle size)

#### Team Workflow

- **Feature branches per component**
- Vanilla JS developers continue parallel work unaffected
- React components reviewed by students who've completed course exercises

---

## Risk Management

### Risks of Adding React Too Early

| Risk                      | Mitigation                                  |
| ------------------------- | ------------------------------------------- |
| Missed deadlines          | Phase 1 stays vanilla (non-negotiable)      |
| Inconsistent code quality | Only introduce after structured learning    |
| Team fragmentation        | Isolated React islands, not full rewrite    |
| Performance regression    | Monitor bundle size, lazy-load React chunks |

### Risks of Staying Vanilla Throughout

| Risk                                       | Mitigation                                        |
| ------------------------------------------ | ------------------------------------------------- |
| Complex state management becomes unwieldy  | Fair concern - evaluate at Phase 2 decision point |
| Code duplication in interactive components | Extract vanilla JS utilities/helpers              |
| Missed learning opportunity                | React course provides structured learning anyway  |

---

## Success Metrics

### Phase 1 (Vanilla JS)

- ✅ Countdown deployed on time
- ✅ All team members successfully contributed via git
- ✅ Mobile performance: <2s load time on 3G

### Phase 2 (Evaluation Point)

- Team completed React course module with understanding
- If React introduced: Component works, no performance regression
- If vanilla maintained: Feature completed faster than React estimate

### Phase 3 (Final Delivery)

- All three pages live and functional
- Mobile-optimised across devices
- Code documented for next year's cohort
- Team can articulate technology choices (not just "we used React")

---

## Educational Outcomes Priority

This roadmap prioritises:

1. **Delivering a working product** over using trendy frameworks
2. **Learning collaboration skills** (git, deployment, code review) that transfer to any tech stack
3. **Understanding when tools are appropriate** rather than applying them reflexively
4. **Building confidence** through successful deliveries before adding complexity

The festival website is a **vehicle for learning**, not a React showcase. If React genuinely improves specific features after proper learning, we integrate it strategically. If vanilla JS delivers the product effectively, that's equally valid.

---

## Recommendation to Teaching Staff

**Start vanilla, evaluate after structured React learning.**

This approach:

- Guarantees first deadline is met
- Aligns React adoption with course curriculum (not premature experimentation)
- Teaches students to choose tools based on requirements, not assumptions
- Produces a working festival site regardless of technology stack

**The question isn't "React or vanilla JS?"**  
**It's "What delivers the best outcome for this team, this timeline, this project?"**

---

## Appendix: When React is Worth the Overhead

React justifies its complexity when:

- **State complexity:** >5 pieces of interdependent state
- **Frequent updates:** UI changes based on user interactions (not static rendering)
- **Component reuse:** Same UI pattern appears 3+ times with different data
- **Developer experience:** Team has React foundation and values DX improvements

React is overhead when:

- Simple pages with minimal interaction
- One-time event site with 6-month lifespan
- Team learning React simultaneously with project delivery
- Mobile performance is critical (bundle size matters)

**For this festival site, most pages lean towards the second category. The roadmap identifies specific exceptions where React might help.**
